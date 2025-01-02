from odoo import fields,models
from odoo.exceptions import UserError

class EstateTownship(models.Model):
    _name = "estate.township"
    _description = "Township"

    name = fields.Char(string="Township",required=True)
    city_ids = fields.Many2one("estate.city",string="City",required=True, ondelete="cascade")
    property_ids = fields.One2many("estate.property","township_id",string="Properties")

    def unlink(self):
        for record in self:
            if record.property_ids:
                raise UserError(
                     "You cannot delete a township that is assigned to a property. "
                    "Please remove or reassign the properties before deleting the township."
                )
            return super(EstateTownship, self).unlink()