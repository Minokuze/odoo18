from odoo import models, fields

class EstateTag(models.Model):
    _name = "estate.property.tag"
    _description ="Real Estate Property Tag"
    _order = "name"

    name = fields.Char(string="Property Tag")
    color = fields.Integer()

    _sql_constraints = [
        # The tag name must be unique
        ('unique_tag_name', 'UNIQUE(name)', 'The tag name must be unique.'),
    ]