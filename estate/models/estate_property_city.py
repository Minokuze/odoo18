from odoo import fields,models
from odoo.exceptions import UserError

class EstateCity(models.Model):
    _name = "estate.city"
    _description = "City"

    name = fields.Char(string="City",required=True)
    township_ids = fields.One2many("estate.township","city_ids",string="Townships")

    def unlink(self):
        for record in self:
            if record.township_ids:
                raise UserError("You cannot delete a city that has associated townships. "
                    "Please delete or reassign the townships before deleting the city.")
        return super(EstateCity, self).unlink()