// docker exec -it <image-name> mongosh -u docker -p mongopw
// 1
db.messages.insertMany([{
  email: "jsnel0@usda.gov",
  message: "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
  instant_sent: 1652147193
}, {
  email: "ewoolston1@goodreads.com",
  message: "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
  instant_sent: 1639004506
}, {
  email: "ngavaran2@scientificamerican.com",
  message: "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
  instant_sent: 1638535527
}, {
  email: "irobins3@theguardian.com",
  message: "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
  instant_sent: 1642051585
}, {
  email: "solle4@stumbleupon.com",
  message: "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
  instant_sent: 1647374527
}, {
  email: "bprozescky5@whitehouse.gov",
  message: "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
  instant_sent: 1643363832
}, {
  email: "ndagworthy6@last.fm",
  message: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
  instant_sent: 1640989621
}, {
  email: "rmatejovsky7@joomla.org",
  message: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
  instant_sent: 1654101883
}, {
  email: "icrinidge8@feedburner.com",
  message: "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.",
  instant_sent: 1647100081
}, {
  email: "bargontt9@arizona.edu",
  message: "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
  instant_sent: 1646154626
}]);


db.products.insertMany([{
  title: "Fennel - Seeds",
  price: 1760,
  thumbnail: "http://dummyimage.com/161x119.png/ff4444/ffffff"
}, {
  title: "Lettuce - Belgian Endive",
  price: 2722,
  thumbnail: "http://dummyimage.com/123x211.png/dddddd/000000"
}, {
  title: "Grapefruit - White",
  price: 3707,
  thumbnail: "http://dummyimage.com/250x243.png/5fa2dd/ffffff"
}, {
  title: "Asparagus - White, Canned",
  price: 4355,
  thumbnail: "http://dummyimage.com/113x245.png/cc0000/ffffff"
}, {
  title: "Apples - Sliced / Wedge",
  price: 452,
  thumbnail: "http://dummyimage.com/139x184.png/cc0000/ffffff"
}, {
  title: "Spice - Pepper Portions",
  price: 4321,
  thumbnail: "http://dummyimage.com/214x110.png/ff4444/ffffff"
}, {
  title: "Lettuce - California Mix",
  price: 3274,
  thumbnail: "http://dummyimage.com/128x227.png/5fa2dd/ffffff"
}, {
  title: "Wine - White, Ej",
  price: 1638,
  thumbnail: "http://dummyimage.com/232x145.png/ff4444/ffffff"
}, {
  title: "Tomatoes - Vine Ripe, Red",
  price: 3594,
  thumbnail: "http://dummyimage.com/181x139.png/cc0000/ffffff"
}, {
  title: "Cherries - Maraschino,jar",
  price: 415,
  thumbnail: "http://dummyimage.com/216x234.png/ff4444/ffffff"
}])

db.products.find()

db.messages.find()


// db.collection.count() deprecated
db.products.countDocuments()
db.messages.countDocuments()

// CRUD

// - Create
db.products.insertOne({
  title: "Mortadella",
  price: 3715,
  thumbnail: "http://dummyimage.com/212x181.png/dddddd/000000"
})

// - Read
db.products.find({price:{$lt:1000}})
db.products.find({price:{$lte:3000, $gte:1000}})
db.products.find({price:{$gt:3000}})
db.products.find().sort({price:1}).map(({title})=>title).skip(2).limit(1)

// - Update
db.products.updateMany({},{$set:{stock:100}})
db.products.updateMany({price:{$gt:4000}},{$set:{stock:0}})

// - Delete
db.products.deleteMany({price:{$lt:1000}})

// Create user with read-only access
db.createUser({
  user: "pepe",
  pwd: "asd456",
  roles: [{
    role: "read",
    db: "ecommerce"
  }]
})
// docker exec -it <image-name> mongosh --username pepe --password asd456 --authenticationDatabase ecommerce
