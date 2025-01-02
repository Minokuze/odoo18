from odoo import models, fields, api
from datetime import timedelta
from odoo.exceptions import UserError

class EstateOffer(models.Model):
    _name = "estate.property.offer"
    _description = "Real Estate Property Offer"
    _order = "price desc"

    price = fields.Float()
    status = fields.Selection(
        [("accepted", "Accepted"), ("refused", "Refused")]
    )
    partner_id = fields.Many2one("res.partner", string="Partner", required=True)
    property_id = fields.Many2one("estate.property", string="Property", required=True, ondelete="cascade")
    validity = fields.Integer(default=7)
    date_deadline = fields.Date(
        compute="_compute_date_deadline",
        inverse="_inverse_date_deadline",
        store=True,
    )

    @api.depends("validity", "create_date")
    def _compute_date_deadline(self):
        for record in self:
            if record.create_date:
                record.date_deadline = record.create_date + timedelta(days=record.validity)
            else:
                record.date_deadline = fields.Date.today() + timedelta(days=record.validity)

    def _inverse_date_deadline(self):
        for record in self:
            if record.date_deadline and record.create_date:
                record.validity = (record.date_deadline - record.create_date.date()).days

    def action_accept(self):
        for record in self:
            if record.property_id.state == "sold":
                raise UserError("Cannot accept offers for a sold property.")
            if record.property_id.offer_ids.filtered(lambda o: o.status == "accepted"):
                raise UserError("An offer is already accepted for this property.")
            record.status = "accepted"
            record.property_id.state = "offer_accepted"
            record.property_id.selling_price = record.price
            record.property_id.buyer_id = record.partner_id

    def action_refuse(self):
        for record in self:
            record.status = "refused"

    _sql_constraints = [
        ('check_offer_price', 'CHECK(price > 0)', 'The offer price must be strictly positive.'),
    ]

    @api.model_create_multi
    def create(self, vals_list):
        records = super(EstateOffer, self).create(vals_list)
        for record in records:
            if record.property_id.state == "new":
                record.property_id.state = "offer_received"
        max_offer = max(record.property_id.offer_ids.mapped("price"))
        if record.price < max_offer:
            raise UserError("You cannot create an offer with a lower amount than an existing offer.")
        return records

    def unlink(self):
        for offer in self:
            # If the offer is being deleted, set the related property's state back to 'new'
            if offer.property_id and offer.property_id.state != "new":
                offer.property_id.state = "new"
        # Call the super method to perform the actual deletion
        return super(EstateOffer, self).unlink()

    property_type_ids = fields.Many2one(
        'estate.property.type', 
        related='property_id.property_type_id', 
        store=True, 
        string="Property Type"
    )
