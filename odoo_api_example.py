import xmlrpc.client

# Connect to the Odoo demo server
# Connection details
url = 'http://localhost:8069'  # Odoo server URL
db = 'mydb'          # Replace with your database name
username = 'admin'            # Replace with your username
password = 'admin'    # Replace with your password
common = xmlrpc.client.ServerProxy('{}/xmlrpc/2/common'.format(url))

# # Fetch and print server version
# version_info = common.version()
# print("Odoo Server Version:", version_info)

# print("Database Info:")
# print(f"URL: {url}")  
# print(f"DB: {db}")
# print(f"Username: {username}")
# print(f"Password: {password}")

# Authenticate
common = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/common')
uid = common.authenticate(db, username, password, {})
if uid:
    print(f"Authenticated as UID: {uid}")
else:
    raise Exception("Authentication failed. Check your credentials.")

models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')

# # Perform an operation (e.g., search for customers)
# partner_ids = models.execute_kw(db, uid, password, 'estate.property', 'search', [[['property_type_id', '=', 'Apartment']]])
# print(f"Partner IDs: {partner_ids}")

# # Fetch 5 records, skipping the first 10
# partner_ids_paginated = models.execute_kw(
#     db, uid, password, 'res.partner', 'search',
#     [[['is_company', '=', True]]],  # Domain
#     {'offset': 5, 'limit': 5}      # Options for pagination
# )
# print("Paginated Partner IDs:", partner_ids_paginated)


# # Count Record
# count_data = models.execute_kw(db, uid, password, 'res.partner', 'search_count', [[['is_company', '=', True]]])
# print(f"Number of company partners: {count_data}")

# # Read details of the first partner
# if partner_ids:
#     record = models.execute_kw(db, uid, password, 'res.partner', 'read', [partner_ids])
#     print(f"Number of fields fetched: {len(record)}")
# else:
#     print("No partners found.")

# #  picking only three fields deemed interesting.
# partner_data = models.execute_kw(
#     db, uid, password, 'res.partner', 'search_read',
#     [[['is_company', '=', True]]],  # Domain
#     {'fields': ['name', 'email', 'phone'], 'limit': 5}  # Specify fields and limit
# )
# print("Partner Data:", partner_data)

    

# # Search by name "foo" and limit results to 10
# results = models.execute_kw(db, uid, password, 'res.partner', 'name_search', ['Azure'], {'limit': 10})
# print("Name Search Results:", results)


# # list record fields
# list_field = models.execute_kw(db, uid, password, 'estate.property', 'fields_get', [], {'attributes': ['string', 'help', 'type']})
# print(list_field)

# # Create new records
# create_record = id = models.execute_kw(db, uid, password, 'res.partner', 'create', [{'name': "New Partner"}])
# print("Created record", create_record)

# # Update Record
# models.execute_kw(db, uid, password, 'res.partner', 'write', [[id], {'name': "Newer partner"}])
# # get record name after having changed it
# update_record=models.execute_kw(db, uid, password, 'res.partner', 'read', [[id], ['display_name']])
# print("Updated record", update_record)

# # Delete Record
# models.execute_kw(db, uid, password, 'res.partner', 'unlink', [[69]])
# # Check if the record exists
# record_exists = models.execute_kw(db, uid, password, 'res.partner', 'search', [[['id', '=', 67]]])
# if record_exists:
#     models.execute_kw(db, uid, password, 'res.partner', 'unlink', [record_exists])
#     print(f"Deleted record with ID: {69}")
# else:
#     print(f"No record found with ID: {69}")\

# # Create New Model
# models.execute_kw(db, uid, password, 'ir.model', 'create', [{
#     'name': "Custom Model",
#     'model': "x_custom_model",
#     'state': 'manual',
# }])

# # Show default fields
# display=models.execute_kw(db, uid, password, 'x_custom_model', 'fields_get', [], {'attributes': ['string', 'help', 'type']})
# print (display)


# # Check if the model already exists
# model_exists = models.execute_kw(db, uid, password, 'ir.model', 'search_read', 
#     [[['model', '=', 'x_custom']], {'fields': ['id']}]
# )

# if not model_exists:
#     # Create the custom model
#     model_id = models.execute_kw(db, uid, password, 'ir.model', 'create', [{
#         'name': "Custom Model",
#         'model': "x_custom",
#         'state': 'manual',
#     }])
# else:
#     model_id = model_exists[0]['id']

# # Check if the field already exists
# field_exists = models.execute_kw(db, uid, password, 'ir.model.fields', 'search_read', 
#     [[['model', '=', 'x_custom'], ['name', '=', 'x_name']], {'fields': ['id']}]
# )

# if not field_exists:
#     # Create the custom field
#     models.execute_kw(db, uid, password, 'ir.model.fields', 'create', [{
#         'model_id': model_id,
#         'name': 'x_name',
#         'ttype': 'char',
#         'state': 'manual',
#         'required': True,
#     }])

# id = models.execute_kw(db, uid, password, 'ir.model', 'create', [{
#     'name': "Custom Model",
#     'model': "x_local_custom",
#     'state': 'manual',
# }])
# models.execute_kw(db, uid, password, 'ir.model.fields', 'create', [{
#     'model_id': id,
#     'name': 'x_name',
#     'ttype': 'char',
#     'state': 'manual',
#     'required': True,
# }])
# record_id = models.execute_kw(db, uid, password, 'x_local_custom', 'create', [{'x_name': "test record"}])
# models.execute_kw(db, uid, password, 'x_local_custom', 'read', [[record_id]])








# titles = models.execute_kw(db, uid, password, 'estate.property', 'search_read', 
#                            [[['city_id', '=', 'Yangon']]])
# print(f"Titles: {titles}")

# properties = models.execute_kw(db, uid, password, 'estate.property', 'name_search', ['House'])
# print(properties)

# count = models.execute_kw(db, uid, password, 'estate.city', 'search', [[]])
# print(f"Number of properties in city named yangon: {count}")

# count = models.execute_kw(db, uid, password, 'estate.property', 'search_count', [[['city_id', '=', 'Yangon']]])
# print(f"Number of properties in city named yangon: {count}")

# count = models.execute_kw(db, uid, password, 'estate.property', 'search_read', [[['city_id', '=', 'Yangon']]])
# print(f"Number of properties in city named yangon: {count}")

# # Step 1: Search for the properties with the title 'foo'
# property_ids = models.execute_kw(db, uid, password, 'estate.property', 'search', [[['state', '=', 'offer_accepted']]])

# # Step 2: Read the fields 'title', 'state', and 'selling_price' of the fetched properties
# properties = models.execute_kw(db, uid, password, 'estate.property', 'read', [[13], ['title', 'expected_price', 'selling_price']])
# # # OR
# properties = models.execute_kw(db, uid, password, 'estate.property', 'read', [property_ids], {'fields': ['title', 'description', 'expected_price']})
# # # Step 3: Print the fetched property details
# print(properties)

# # To retrieve field metadata for the 'estate.property' model
# field_metadata = models.execute_kw(db, uid, password, 'estate.property', 'fields_get', [['title','description']],{'attributes': ['string','type']})

# # Print the field metadata
# print(field_metadata)

# search_read = models.execute_kw(db, uid, password, 'estate.property', 'search_read', [[['state', '=', 'new']]], {'fields': ['title', 'property_type_id', 'postcode'], 'limit': 5})
# print(search_read)

# id = models.execute_kw(db, uid, password, 'estate.property', 'create', [{'title': "New House",
#                                                                           'description': 'A new property for sale',
#                                                                         'postcode': '12345',
#                                                                         'expected_price': 500000,
#                                                                         'selling_price': 450000,
#                                                                         'bedrooms': 3,
#                                                                         'living_area': 120.0,
#                                                                         'garden': True,
#                                                                         'garden_area': 50.0,
#                                                                         'city_id': 48,  # Assuming city_id 1 exists
#                                                                         'township_id': 23,  # Assuming township_id 1 exists
#                                                                         }])
# print(id)

# id = models.execute_kw(db, uid, password, 'estate.city', 'create', [{'name' :'Bago' }])
# print(id)

# id = models.execute_kw(db, uid, password, 'estate.city', 'write', [[52],{'name':'Bagan'}])
# print(id)

# id = models.execute_kw(db, uid, password, 'estate.property', 'read', [[22],['display_name']])
# print(id)

# models.execute_kw(db, uid, password, 'estate.property', 'unlink', [[22]])

# id = models.execute_kw(db, uid, password, 'estate.property', 'search', [[['id', '=', 22]]])
# print(id)

# # Filter by city
# properties_by_city = models.execute_kw(
#     db, uid, password, 
#     'estate.property', 
#     'search_read', 
#     [[['city_id.name', '=', 'Yangon']]],  # Filter by city name
#     {'fields': ['id', 'title']}
# )

# # Filter by expected price
# properties_by_price = models.execute_kw(
#     db, uid, password, 
#     'estate.property', 
#     'search_read', 
#     [[['expected_price', '>=', 100]]],  # Filter by expected_price
#     {'fields': ['id', 'title', 'expected_price']}
# )

# print(f"Properties in Yangon: {properties_by_city}")
# print(f"Properties with expected price >= 100,000: {properties_by_price}")

choose = input("choose an option 1.city and 2.expected_price for filter :")
if choose == "1":
    city_name = input("Yangon or Mandalay :")
    properties_by_city = models.execute_kw(
        db, uid, password, 
        'estate.property', 
        'search_read', 
        [[['city_id.name', '=', city_name]]], 
        {'fields': ['id', 'title']}
    )
    print(f"Properties filtered by {city_name} : {properties_by_city}")

elif choose == "2":
    min_price = float(input("Enter the minimum expected price: "))
    properties_by_price = models.execute_kw(
        db, uid, password, 
        'estate.property', 
        'search_read', 
        [[['expected_price', '>=', min_price]]],  
        {'fields': ['id', 'title', 'expected_price']}
    )
    print(f"Properties with expected price >= {min_price}: {properties_by_price}")

else :
    print("It is an invalid Option")
