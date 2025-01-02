from odoo import models, fields, api
from datetime import datetime, timedelta
from odoo.exceptions import UserError,ValidationError
from odoo.tools import float_compare, float_is_zero

class EstateProperty(models.Model):
    _name = "estate.property"
    _description = "This is description"
    _order = "id desc"
    _rec_name = "title"

    title = fields.Char(required=True)
    description = fields.Text()
    postcode = fields.Char(string="Postcode")
    availability_date = fields.Date(string="Available from", copy=False, default=lambda self: datetime.today() + timedelta(days=90))
    expected_price = fields.Float()
    selling_price = fields.Float(readonly=True, copy=False)
    bedrooms = fields.Integer(default=2)
    living_area = fields.Float(string="Living Area(sqm)")
    facades = fields.Integer()
    garage = fields.Boolean()
    garden = fields.Boolean()
    garden_area = fields.Float()
    total_area = fields.Float(compute="_compute_total_area",readonly=True)
    @api.depends("living_area","garden_area")
    def _compute_total_area(self):
        for record in self:
            record.total_area = record.living_area + record.garden_area
    garden_orientation = fields.Selection(
        [
            ('north','North'),
            ('south','South'),
            ('east','East'),
            ('west','West')
         ]
         )
    @api.onchange("garden")
    def _onchange_garden(self):
        if self.garden:
            self.garden_area = 10
            self.garden_orientation = "north"
        else :
            self.garden_area = 0
            self.garden_orientation = False
    state = fields.Selection([
    ('new', 'New'),
    ('offer_received', 'Offer Received'),
    ('offer_accepted', 'Offer Accepted'),
    ('sold', 'Sold'),
    ('cancelled', 'Cancelled'),
    ], default='new', required=True, copy=False, string="Status")
    def action_set_sold(self):
        for record in self:
            if record.state == "cancelled":
                raise UserError("A cancelled property cannot be set as sold.")
            record.state = "sold"

    def action_set_cancelled(self):
        for record in self:
            if record.state == "sold":
                raise UserError("A sold property cannot be cancelled.")
            record.state = "cancelled"
    active = fields.Boolean(default=True)
    property_type_id = fields.Many2one("estate.property.type", string="Property Type")
    buyer_id = fields.Many2one("res.partner", string="Buyer", copy=False)
    salesperson_id = fields.Many2one(
        "res.users", string="Salesperson", default=lambda self: self.env.user
    )
    tag_ids = fields.Many2many("estate.property.tag", string="Tags")
    offer_ids = fields.One2many("estate.property.offer","property_id", string="Offers")
    best_price = fields.Float(compute="_compute_best_price")
    @api.depends("offer_ids.price")
    def _compute_best_price(self):
        for record in self:
            record.best_price = max(record.offer_ids.mapped("price"), default=0)
    
    _sql_constraints = [
        # The expected price must be strictly positive
        ('check_expected_price', 'CHECK(expected_price > 0)', 'The expected price must be strictly positive.'),
        # The selling price must be positive
        ('check_selling_price', 'CHECK(selling_price >= 0)', 'The selling price must be positive.'),
    ]

    @api.constrains("selling_price","expected_price")
    def _check_selling_price(self):
        for record in self:
            if float_is_zero(record.selling_price, precision_digits=2):
                continue
            if float_compare(record.selling_price, record.expected_price*0.9, precision_digits=2)<0:
                raise ValidationError("The selling price cannot be lower than 90% of the expected price")
            
    @api.ondelete(at_uninstall=False)
    def _check_state_on_delete(self):
        for record in self:
            if record.state not in ['new', 'cancelled']:
                raise UserError("You cannot delete a property that is not in 'New' or 'Cancelled' state.")
            
    city_id = fields.Many2one("estate.city", string="City", required=True)
    township_id = fields.Many2one("estate.township", string="Township", required=True,ondelete='cascade')
