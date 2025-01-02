from odoo import models, fields,api

class EstatsType(models.Model):
    _name ="estate.property.type"
    _description = "Real Estate Property Type"
    _order = "sequence,name"

    name = fields.Char(string="Property Type", required= True)

    _sql_constraints = [
        # The property type name must be unique
        ('unique_type_name', 'UNIQUE(name)', 'The property type name must be unique.'),
    ]

    property_ids=fields.One2many("estate.property","property_type_id",string="Properties")

    sequence = fields.Integer(default=10)

    # Define the One2many relationship for offers related to the property type
    offer_ids = fields.One2many("estate.property.offer", "property_type_ids", string="Offers")
    
    # Computed field to count the number of offers related to the property type
    offer_count = fields.Integer(string="Offer Count", compute='_compute_offer_count')

    @api.depends('offer_ids')
    def _compute_offer_count(self):
        for record in self:
            record.offer_count = len(record.offer_ids)