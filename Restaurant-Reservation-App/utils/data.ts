const rsaRestaurants = [
  {
      id: 1,
      name: "Nando's",
      description: 'Famous for its flame-grilled peri-peri chicken, Nando\'s offers a bold and flavorful dining experience.',
      address: '1 Nando’s Way, Johannesburg, South Africa',
      gallery: [          
        'https://th.bing.com/th/id/R.501a1633c8576b1d61c43957cc3ef805?rik=YVYyHu9KmXlPjg&riu=http%3a%2f%2fallaboutfoodltd.com%2fwp-content%2fuploads%2f2017%2f10%2fNEWEST-NANDOS.png&ehk=X%2f7S5qlyjhfUzNV8ol8mSD4YCe%2f78ufH7CEBWgBfQ6k%3d&risl=&pid=ImgRaw&r=0',
        'https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/05/26/14/nandos.jpg',
        'https://example.com/nandos3.jpg'
      ],
      menu: [
          {
            images: [
              "https://th.bing.com/th/id/OIP.Yj--gfs2QMkjUdlKf6DelwHaEK?rs=1&pid=ImgDetMain", 
              "https://th.bing.com/th/id/OIP.O9rHhiXHbce0tW2_GXuZRgAAAA?rs=1&pid=ImgDetMain"
              ],
            name: 'Peri-Peri Chicken',
            description: 'Grilled to perfection, marinated with Nando’s famous peri-peri sauce.',
            price: 120.99
          },
          {
            images: ["https://images.nandos.co.za/s3fs-public/Espedata.jpg", "https://i.pinimg.com/736x/d8/60/1f/d8601f0121d4776ca940c6e38ed2ec62.jpg"],
            name: 'Espetada',
            description: 'A tender skewer of flame-grilled chicken or beef, served with a side of rice.',
            price: 150.99
          },
          {
            images:[ 
              "https://th.bing.com/th/id/OIP.O5ZrUu7IE-cJS3uyivjwwwHaEg?rs=1&pid=ImgDetMain",
              "https://images.bauerhosting.com/legacy/media/5a1f/d615/ba31/7f6c/7349/675d/Nandos-Christmas-High-Res-Header.jpg?ar=16:9&fit=crop&crop=top&auto=format&w=1200&q=80"
            ],
            name: 'Halloumi Burger',
            description: 'Grilled halloumi with peri-peri sauce, served with a soft bun.',
            price: 95.99
          }
      ],
      openingHours: {
          mondayToFriday: '10:00 AM - 10:00 PM',
          saturday: '10:00 AM - 11:00 PM',
          sunday: '10:00 AM - 9:00 PM'
      },
      reviews: [
          {
              user: 'Lindiwe M.',
              rating: 5,
              review: 'Best peri-peri chicken in the country! Always a satisfying meal.',
          },
          {
              user: 'Thabo P.',
              rating: 4,
              review: 'Great food but sometimes the service can be a bit slow.',
          }
      ]
  },
  
  {
      id: 3,
      name: 'Spur',
      description: 'A South African classic, The Spur serves up delicious steaks, ribs, burgers, and a variety of other comfort food.',
      address: '456 Spur Road, Durban, South Africa',
      gallery: [
          'https://images.myguide-cdn.com/mauritius/companies/spur-steak-ranches/large/spur-steak-ranches-496705.png',
          'https://images.jacobinmag.com/wp-content/uploads/sites/3/2015/02/27022249/IMG_4992.jpg',
          'https://example.com/spur3.jpg'
      ],
      menu: [
          {
              name: 'Rib Eye Steak',
              description: 'A succulent rib-eye steak grilled to your preferred level of doneness.',
              price: 180.99
          },
          {
              name: 'Spur Burger',
              description: 'A hearty burger with fresh toppings, served with crispy fries.',
              price: 120.99
          },
          {
              name: 'BBQ Ribs',
              description: 'Juicy, tender ribs coated in a rich BBQ sauce.',
              price: 150.99
          }
      ],
      openingHours: {
          mondayToFriday: '9:00 AM - 11:00 PM',
          saturday: '10:00 AM - 12:00 AM',
          sunday: '10:00 AM - 10:00 PM'
      },
      reviews: [
          {
              user: 'Sipho B.',
              rating: 5,
              review: 'The best ribs in town! Never disappoints.',
          },
          {
              user: 'Sophie T.',
              rating: 4,
              review: 'Good food, but the wait times can be long during peak hours.',
          }
      ]
  },

  {
      id: 4,
      name: "McDonald's",
      description: 'The world’s largest chain of fast food restaurants, known for its burgers, fries, and iconic golden arches.',
      address: '123 McDonald’s Ave, Cape Town, South Africa',
      gallery: [
        'https://upload.wikimedia.org/wikipedia/commons/c/c0/McDonald%27s_logo_2018.png',
        'https://www.mcdonalds.co.za/wp-content/uploads/2019/10/mcdonalds_international.jpg',
        'https://www.mcdonalds.co.za/wp-content/uploads/2019/12/mcdonalds_franchise.jpg'
      ],
      menu: [
        {
            images: [
                "https://www.mcdonalds.co.za/wp-content/uploads/2019/12/Big-Mac.jpg",
                "https://www.mcdonalds.co.za/wp-content/uploads/2019/12/Quarter-Pounder.jpg"
            ],
            name: 'Big Mac',
            description: 'Two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun.',
            price: 70.99
        },
        {
            images: [
                "https://www.mcdonalds.co.za/wp-content/uploads/2019/12/Happy-Meal.jpg",
                "https://www.mcdonalds.co.za/wp-content/uploads/2019/12/Chicken-Nuggets.jpg"
            ],
            name: 'Happy Meal',
            description: 'A child-friendly meal with nuggets, fries, and a toy.',
            price: 49.99
        },
        {
            images: [
                "https://www.mcdonalds.co.za/wp-content/uploads/2019/12/McFlurry.jpg",
                "https://www.mcdonalds.co.za/wp-content/uploads/2019/12/Soft-Serve.jpg"
            ],
            name: 'McFlurry',
            description: 'Soft-serve ice cream mixed with your favorite toppings.',
            price: 35.99
        }
      ],
      openingHours: {
          mondayToFriday: '7:00 AM - 11:00 PM',
          saturday: '7:00 AM - 12:00 AM',
          sunday: '8:00 AM - 10:00 PM'
      },
      reviews: [
          {
              user: 'Jabu N.',
              rating: 4,
              review: 'Always a go-to spot for a quick meal. The Big Mac is timeless!',
          },
          {
              user: 'Musa D.',
              rating: 5,
              review: 'The best fast food, fast service, and affordable prices.',
          }
      ]
  },

  {
      id: 5,
      name: "KFC",
      description: 'Known for its finger-licking good fried chicken, KFC serves a variety of chicken, sides, and delicious meals.',
      address: '789 KFC Lane, Pretoria, South Africa',
      gallery: [
        'https://upload.wikimedia.org/wikipedia/commons/e/ea/KFC_logo_2018.png',
        'https://www.kfc.co.za/wp-content/uploads/2021/01/kfc-store.jpg',
        'https://www.kfc.co.za/wp-content/uploads/2021/01/kfc-franchise.jpg'
      ],
      menu: [
        {
            images: [
                "https://www.kfc.co.za/wp-content/uploads/2020/05/KFC-Fried-Chicken.jpg",
                "https://www.kfc.co.za/wp-content/uploads/2020/05/KFC-Zinger.jpg"
            ],
            name: 'Original Recipe Chicken',
            description: 'The classic KFC chicken, seasoned with our secret blend of 11 herbs and spices.',
            price: 85.99
        },
        {
            images: [
                "https://www.kfc.co.za/wp-content/uploads/2020/05/KFC-Bucket.jpg",
                "https://www.kfc.co.za/wp-content/uploads/2020/05/KFC-Burger.jpg"
            ],
            name: 'KFC Bucket Meal',
            description: 'A bucket full of crispy chicken, served with fries, coleslaw, and gravy.',
            price: 159.99
        },
        {
            images: [
                "https://www.kfc.co.za/wp-content/uploads/2020/05/KFC-Wings.jpg",
                "https://www.kfc.co.za/wp-content/uploads/2020/05/KFC-Fried-Chicken-Wings.jpg"
            ],
            name: 'Chicken Wings',
            description: 'A selection of crispy chicken wings, served with your choice of sauce.',
            price: 65.99
        }
      ],
      openingHours: {
          mondayToFriday: '9:00 AM - 10:00 PM',
          saturday: '9:00 AM - 11:00 PM',
          sunday: '10:00 AM - 9:00 PM'
      },
      reviews: [
          {
              user: 'Lindiwe M.',
              rating: 5,
              review: 'KFC’s fried chicken is unbeatable. Always fresh and delicious!',
          },
          {
              user: 'Thabo P.',
              rating: 4,
              review: 'Great food but sometimes the service can be a bit slow.',
          }
      ]
  }
];

export default rsaRestaurants;
