import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Painting } from '../interfaces/paintings';
import { Post } from '../interfaces/post';
import { Review } from '../interfaces/review';
import { Reply } from '../interfaces/reply';
import { Comments } from '../interfaces/comments';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    categories: Category[] = [
        {
            "id": 2,
            "name": "Impressionism"
        },
        {
            "id": 3,
            "name": "Abstract"
        },
        {
            "id": 1,
            "name": "Expressionism"
        },
        {
            "id": 5,
            "name": "Surrealism"
        },
        {
            "id": 4,
            "name": "Realism"
        }
    ];

    paintings: Painting[] = [
        {
            "name": "War in Ukraine",
            "id": 8,
            "author": "Alexander Kaniuka",
            "yearMade": 2022,
            "price": 42500,
            "image": "assets/2.jpg",
            "category": 2,
            "description": "Art conveying the current situation in Ukraine. For more than five years, fighting has continued on the territory ... It is made in the format 30 * 40. I can provide all the work processes.",
            "popularity": [
                "top ranking",
                "bestsellers"
            ],
            "rating": 1,
            "inStock": "In Stock",
            "delivery": 10
        },
        {
            "name": "Sleeping Hero",
            "id": 1,
            "author": "Sebastien Blondet",
            "yearMade": 2022,
            "price": 12200,
            "image": "assets/1.jpg",
            "oldPrice": 15000,
            "discount": 18,
            "category": 1,
            "description": "Inspired by the poem of Arthur Rimbaud 'Le dormeur du val'. This art is dedicated to all the men and women who gave their life to defend their land and families. May you rest in eternal peace.",
            "popularity": [
                "most popular",
                "bestsellers"
            ],
            "inStock": "In Stock",
            "delivery": 8
        },
        {
            "name": "Support for Ukraine",
            "id": 3,
            "author": "Arthur Steinbach",
            "yearMade": 2022,
            "price": 5000,
            "image": "assets/3.jpg",
            "oldPrice": 7000,
            "discount": 28,
            "category": 3,
            "description": "European Bird Census Council expresses its deep concern about the military attack of the Russian Federation on Ukraine. Birds do not know borders, and their research and conservation require international cooperation. Within EBCC projects, we work together with individuals and organisations across whole Europe towards common goals. Regardless of differences in languages, cultures, religion, or political views, the EBCC network has always shown a sense of cooperation and solidarity.",
            "popularity": [
                "most popular"
            ],
            "rating": 3,
            "inStock": "In Stock",
            "delivery": 14
        },
        {
            "name": "Heroes of Ukraine",
            "id": 7,
            "author": "Su Yu",
            "yearMade": 2022,
            "price": 3000,
            "image": "assets/4.jfif",
            "oldPrice": 3500,
            "discount": 14,
            "category": 4,
            "description": "Oil on canvas - diptych. Su Yu is a Chinese artist born in 1987 who lives & works in Beijing in China. He was an old student of prestigious art teachers as Shi Liang & Chen Danqing at Oil Painting Institute in Beijing.",
            "popularity": [
                "bestsellers",
                "top ranking"
            ],
            "rating": 4,
            "inStock": "In Stock",
            "delivery": 7
        },
        {
            "name": "Mother and Baby Jesus",
            "id": 6,
            "author": "Maria Harasowska-Daczyszyn",
            "yearMade": 1911,
            "price": 30000,
            "image": "assets/5.png",
            "category": 5,
            "description": "The Marian Library has a series of prints by the well-known Ukrainian artist Maria Harasowska-Daczyszyn (1911-2000). Known by her nickname 'Mika', she was born in the city of Staryi Sambir, Ukraine, to a religious family that encouraged her artistic pursuits from an early age. It is estimated that she created over 1,000 paintings in her lifetime — portraits, natural landscapes, and Marian icons featuring the Blessed Mother and Baby Jesus in various stylized traditional Ukrainian clothing. ",
            "popularity": [
                "most popular",
                "bestsellers"
            ],
            "rating": 5,
            "inStock": "In Stock",
            "delivery": 10
        },
        {
            "name": "Boris Chuprina",
            "id": 5,
            "author": "Team of the Chernihiv Regional Historical Museum",
            "yearMade": 2022,
            "price": 616000,
            "image": "assets/6.jpg",
            "category": 1,
            "description": "23 May 2022 year Cossack community of Chernihiv military church of St.. Catherine and the Free Cossacks, according to the ancient customs and traditions of the Ukrainian Cossacks, noted the contribution of the Prime Minister of the United Kingdom Boris Johnson in protecting the rights and freedoms of Ukrainians, in defending our honor and dignity in the struggle for Ukraine's independence against Russian military aggression. By the decision of the community, Boris Johnson was ordained a Cossack and named Boris Chuprina. New times introduce new traditions. The dedication took place in absentia, but for the Great Supporter of Ukraine, such an exception can be made.",
            "popularity": [
                "bestsellers",
                "top ranking"
            ],
            "rating": 1,
            "inStock": "In Stock",
            "delivery": 14
        },
        {
            "name": "Pes Patron",
            "id": 4,
            "author": "Ukrainian volunteer",
            "yearMade": 2022,
            "price": 16000,
            "image": "assets/7.jfif",
            "oldPrice": 18000,
            "discount": 11,
            "category": 2,
            "description": "Patron first came to prominence during the 2022 Russian invasion of Ukraine, during which Ukrainian president Volodymyr Zelenskyy awarded him the Order for Courage for his work in locating and defusing unexploded ordnance left behind by Russian troops. As of 8 May 2022, Patron has found 236 such devices.",
            "popularity": [
                "top ranking",
                "bestsellers"
            ],
            "rating": 2,
            "inStock": "In Stock",
            "delivery": 10
        }
    ];

    productReviews: Review[] = [

    ];

    shopReviews: Review[] = [
        {
            "firstName": "Andrii",
            "lastName": "Semeriak",
            "email": "asd@asd",
            "rating": 4,
            "comments": "Good!",
            "date": "2023-03-04T13:56:05.304Z",
            "id": 1
        },
        {
            "firstName": "Oksana",
            "lastName": "Semeriak",
            "email": "sdsd@sdfasd",
            "rating": 5,
            "comments": "Nice!",
            "date": "2023-04-04T13:56:05.304Z",
            "id": 2
        },
        {
            "firstName": "Asfur",
            "lastName": "Abdel Rahim",
            "email": "asdasda55@adas",
            "rating": 3,
            "comments": "This is an super space for your customers qoute. Don’t worry it works smooth as pie. You will get all what you need by writiing a text here",
            "date": "2023-05-04T13:56:05.304Z",
            "id": 3
        },
        {
            "firstName": "Ali",
            "lastName": "Bentner",
            "email": "jhhhgj@asd",
            "rating": 1,
            "comments": "I did not find the painting what I wanted",
            "date": "2023-06-04T13:56:05.304Z",
            "id": 4
        },
        {
            "firstName": "Azer",
            "lastName": "Wonder",
            "email": "qwer25@asd",
            "rating": 1,
            "comments": "very few products",
            "date": "2023-07-04T13:56:05.304Z",
            "id": 5
        },
        {
            "firstName": "Ira",
            "lastName": "Lastivka",
            "email": "erituer55@asd",
            "rating": 4,
            "comments": "Not so many products but very nice paintings",
            "date": "2023-08-04T13:56:05.304Z",
            "id": 6
        }
    ];

    posts: Post[] = [
        {
            "id": 1,
            "image": [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/1280px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1uoFqfTdUYRmy9QYQ976izhhkg0TMxviWCw&usqp=CAU"
            ],
            "header": "Impressionism developed in France in the nineteenth century",
            "author": "Wilson Steer",
            "tags": [
                "Impressionism",
                "Color Field Painting"
            ],
            "date": new Date(1900, 1, 17),
            "category": 1,
            "info": "In general there are three schools of philosophy regarding art, focusing respectively on form, content, and context.[57] Extreme Formalism is the view that all aesthetic properties of art are formal (that is, part of the art form). Philosophers almost universally reject this view and hold that the properties and aesthetics of art extend beyond materials, techniques, and form.[58] Unfortunately, there is little consensus on terminology for these informal properties. Some authors refer to subject matter and content—i.e., denotations and connotations—while others prefer terms like meaning and significance.[57] Extreme Intentionalism holds that authorial intent plays a decisive role in the meaning of a work of art, conveying the content or essential main idea, while all other interpretations can be discarded.[59] It defines the subject as the persons or idea represented, [60] and the content as the artist's experience of that subject.[61] For example, the composition of Napoleon I on his Imperial Throne is partly borrowed from the Statue of Zeus at Olympia. As evidenced by the title, the subject is Napoleon"
        },
        {
            "id": 2,
            "image": [
                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/53px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
                "https://collectionapi.metmuseum.org/api/collection/v1/iiif/436535/796067/main-image"
            ],
            "header": "Post-Impressionism emerged in the late 19th century",
            "author": "Vincent van Gogh",
            "tags": [
                "Post-Impressionism",
                "Expressionism"
            ],
            "date": new Date(1915, 6, 15),
            "category": 1,
            "info": "Post-Impressionism is an art movement that emerged in the late 19th century as a response to Impressionism. It is characterized by a focus on symbolic or expressive content, using vibrant colors, thick brushstrokes, and unconventional perspectives. Vincent van Gogh is one of the prominent figures associated with Post-Impressionism. His painting 'Starry Night' is a prime example of this artistic style, featuring swirling brushwork, intense colors, and a dreamlike atmosphere. Van Gogh aimed to convey his emotions and inner experiences through his art, creating a bridge between the external world and his personal vision. The painting is considered one of the most famous and influential works in Western art history."
        },
        {
            "id": 3,
            "image": [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYTFKs29CpvnAAbC1jHRRlmhYNyh9WfkvgiTiOL06BFLkygmQFS9vKAVkleF1t3hw6cd0&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzQXb-ui7orz6X4zFtP0zsfIEY1A-yvanvnhzTtAYiahHTorZYdpR9NmgUgHvWwjIUtUw&usqp=CAU"
            ],
            "header": "Cubism revolutionized the concept of representation",
            "author": "Pablo Picasso",
            "tags": [
                "Cubism",
                "Avant-Garde"
            ],
            "date": new Date(1755, 4, 10),
            "category": 2,
            "info": "Cubism is an innovative art movement that emerged in the early 20th century. It revolutionized the concept of representation by breaking down objects and subjects into geometric forms, depicting multiple viewpoints simultaneously. Pablo Picasso, along with Georges Braque, is credited with the development of Cubism. Picasso's painting 'Violin' exemplifies the analytical phase of Cubism, featuring fragmented shapes, overlapping planes, and a monochromatic color palette. The artwork challenges traditional notions of perspective and invites the viewer to perceive the subject from multiple angles. Cubism paved the way for further explorations in abstract art and had a significant influence on subsequent artistic movements."
        },
        {
            "id": 4,
            "image": [
                "https://uploads8.wikiart.org/images/edvard-munch/melancholy-1892.jpg",
                "https://miro.medium.com/v2/resize:fit:1400/1*hkIzFsQGXS6_B-FJYRX3oA.jpeg"
            ],
            "header": "Expressionism conveys intense emotions and subjective experiences",
            "author": "Edvard Munch",
            "tags": [
                "Expressionism",
                "Symbolism"
            ],
            "date": new Date(1855, 7, 15),
            "category": 2,
            "info": "Expressionism is an art movement that emerged in the early 20th century, emphasizing the expression of intense emotions and subjective experiences. Edvard Munch, a Norwegian painter, is known for his iconic artwork 'The Scream.' The painting captures a haunting figure against a vivid and swirling backdrop, conveying a sense of fear, anxiety, and existential angst. Munch's use of vibrant colors, distorted forms, and expressive brushwork contributes to the overall emotional impact of the artwork. 'The Scream' is considered a symbol of modern anxiety and has become an iconic representation of Expressionism."
        },
        {
            "id": 5,
            "image": [
                "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRvuXlBejXVhybTaaqDdM5ZAsobgHf5bDyzb8kzybTk2kCiZoL7",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKBLnXjYAp9ceEuXW0G7uQeh9-wB7xdn6lOtYCfk7WxAh-ZBb-EoMRbsHg7Inu7-O0uME&usqp=CAU"
            ],
            "header": "Abstract art explores non-representational forms and ideas",
            "author": "Franz Marc",
            "tags": [
                "Abstract Art",
                "Expressionism"
            ],
            "date": new Date(1922, 2, 22),
            "category": 3,
            "info": "Abstract art is a genre that explores non-representational forms and ideas, focusing on the expressive power of color, shape, line, and texture. Wassily Kandinsky, a Russian painter and art theorist, is considered one of the pioneers of abstract art. His painting 'Composition VII' is a complex arrangement of geometric shapes, vibrant colors, and dynamic lines. Kandinsky believed that art could evoke emotions and spiritual experiences independent of visual references to the physical world. 'Composition VII' reflects his quest for a universal language of art that transcends the limitations of material reality. Abstract art continues to challenge traditional notions of representation and invites viewers to engage with the artwork on a more subjective and imaginative level."
        },
        {
            "id": 6,
            "image": [
                "https://uploads2.wikiart.org/images/magdalena-carmen-frieda-kahlo-y-calder%C3%B3n-de-rivera/diego-and-i-1949.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6hoQmHAfn44GoxnmOVZPYJEUjqIuLTuujuv4sM_h0hGv5bkCngBMPLZQS81Gu0AubAPY&usqp=CAU"
            ],
            "header": "Surrealism explores the realm of dreams and the subconscious",
            "author": "Frida Kahlo",
            "tags": [
                "Surrealism",
                "Self-Portraiture"
            ],
            "date": new Date(1899, 2, 12),
            "category": 3,
            "info": "Surrealism is an artistic and literary movement that emerged in the early 20th century, aiming to explore the realm of dreams, the subconscious, and the irrational. Frida Kahlo, a Mexican artist known for her self-portraits, incorporated surrealistic elements into her works. In her painting 'The Two Fridas,' she depicts two versions of herself connected by a blood vessel, representing her dual heritage and inner struggles. The painting combines realistic and fantastical elements, blurring the boundaries between reality and imagination. Surrealism allowed artists like Kahlo to express their innermost thoughts, desires, and fears through symbolic and dreamlike imagery."
        },
        {
            "id": 7,
            "image": [
                "https://www.artnews.com/wp-content/uploads/2020/05/6323912l-1.jpg",
                "https://aaqeastend.com/wp-content/uploads/2014/04/AAQ-Pollock-Mural-300-dpi+-85181.jpg"
            ],
            "header": "Abstract Expressionism emphasizes the act of painting and gestural expression",
            "author": "Jackson Pollock",
            "tags": [
                "Abstract Expressionism",
                "Action Painting"
            ],
            "date": new Date(1755, 1, 5),
            "category": 3,
            "info": "Abstract Expressionism is an art movement that emerged in the mid-20th century, emphasizing spontaneous and gestural expression through the act of painting. Jackson Pollock, an American artist, is renowned for his unique painting technique known as 'drip painting' or 'action painting.' His artwork 'No. 5' exemplifies his approach, featuring intricate webs of dripped, poured, and splattered paint on a large canvas. Pollock's abstract compositions were meant to evoke emotional and subconscious responses in viewers. Abstract Expressionism represented a departure from traditional forms of representation and focused on the physicality and energy of the artistic process itself."
        },
        {
            "id": 8,
            "image": [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6aV9TmcLXwiFc0c_vWwlLvNsezWw3TBCqRToOFDAre4pliqVnGE9LZGFIiKE76YzeNWg&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMZI1_vpoUQ24NPsXqoIMFWg0gJwztm0Iint3TtU5AYnmI0Yjti-4VVf2HwxNTSBA2JD8&usqp=CAU"
            ],
            "header": "Pop Art merges popular culture with artistic expression",
            "author": "Andy Warhol",
            "tags": [
                "Pop Art",
                "Printmaking"
            ],
            "date": new Date(1870, 11, 10),
            "category": 4,
            "info": "Pop Art is an art movement that emerged in the 1950s and 1960s, incorporating popular culture imagery and mass media elements into artistic expression. Andy Warhol, an American artist, is one of the most prominent figures associated with Pop Art. His artwork 'Campbell's Soup Cans' is an iconic example, consisting of multiple canvases depicting different flavors of Campbell's Soup. Warhol's use of repetition and appropriation of familiar consumer products challenged traditional notions of originality and elevated everyday objects to the status of art. Pop Art sought to blur the boundaries between high art and popular culture, reflecting the vibrant and commercialized society of the time."
        },
        {
            "id": 9,
            "image": [
                "https://i0.wp.com/obeygiant.com/images/2019/06/Defend-Dignity-White-1800px.jpg?fit=1352%2C1800&ssl=1",
                "https://images.theconversation.com/files/335415/original/file-20200515-138624-1r2kjce.jpg?ixlib=rb-1.1.0&rect=0%2C7%2C613%2C613&q=45&auto=format&w=926&fit=clip"
            ],
            "header": "Street Art brings art to public spaces and addresses social issues",
            "author": "Shepard Fairey",
            "tags": [
                "Street Art",
                "Activism"
            ],
            "date": new Date(1965, 8, 25),
            "category": 4,
            "info": "Street Art is an artistic movement that emerged in the 1980s, characterized by art created in public spaces, often addressing social and political issues. Keith Haring, an American artist, is known for his bold and vibrant murals featuring simplified figures and symbols. His artwork 'Red Heart' is a recurring motif in his work, symbolizing love, unity, and compassion. Haring's street art aimed to break down barriers between art and the public, making art accessible to all. It also served as a form of activism, raising awareness about various social issues. Street Art continues to thrive as a powerful medium for self-expression and community engagement."
        },
        {
            "id": 10,
            "image": [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpH6F5Cvs_UmM1nd0ttK5TuLpCYH7SRfRfQxAVwvbLyyhiRVx2q-XkOdPtKn13l0Dz0RY&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR51d-ZzKU0I0pcUd3d0j9mf0JDeSBqR2L4ou7xxl_MTsEy91jA9EnKr5trFiEB0h170z0&usqp=CAU"
            ],
            "header": "Conceptual Art emphasizes ideas and concepts over aesthetic concerns",
            "author": "Yayoi Kusama",
            "tags": [
                "Conceptual Art",
                "Installation Art",
                "Neo-Pop Art",
                "Graffiti Art"
            ],
            "date": new Date(1875, 2, 10),
            "category": 5,
            "info": "Conceptual Art is an art movement that emerged in the 1960s, focusing on ideas, concepts, and intellectual exploration rather than traditional aesthetic concerns. Yayoi Kusama, a Japanese artist, is known for her immersive and thought-provoking installations. Her artwork 'Acumulation 1' consists of various objects covered in fabric phallic shapes, challenging societal norms and exploring themes of sexuality and desire. Kusama's conceptual approach invites viewers to engage with the artwork conceptually and intellectually, questioning the nature of art and its relationship to the viewer. Conceptual Art expands the boundaries of traditional art forms and encourages critical thinking and dialogue."
        },
        {
            "id": 11,
            "image": [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmAhL37q8c9oHfdscXbXzI4-tySmkR0qphkyr0A3ASPMKS6-mKzIZ_tntDIe8hwrYBi8E&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTij9L7QdOQv2ZFGj5Mxtz8fERsbNGEMcT-Byb4FIMwU4_axX3BE9jtnvbA6JSfdXn3nU8&usqp=CAU"
            ],
            "header": "Neo-Pop Art combines elements of popular culture with a contemporary twist",
            "author": "Jeff Koons",
            "tags": [
                "Neo-Pop Art",
                "Sculpture",
                "Street Art"
            ],
            "date": new Date(2000, 2, 10),
            "category": 5,
            "info": "Neo-Pop Art is a contemporary art movement that emerged in the 1980s, influenced by Pop Art but with a postmodern twist. Jeff Koons, an American artist, is known for his larger-than-life sculptures that merge popular culture references with a touch of kitsch. His artwork 'Puppy' is a colossal sculpture of a West Highland White Terrier covered in colorful flowers. Koons' Neo-Pop Art blurs the boundaries between high art and consumer culture, exploring themes of mass production, celebrity, and the commodification of art. It reflects the influence of media and consumerism on contemporary society while simultaneously challenging traditional notions of artistic value."
        },
        {
            "id": 12,
            "image": [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSZJhubwIHtpCzTUu53iSs4pjhl4wym__5OzppBMs0EiPU9BvEryVs98uc7G540wAZuEk&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfNUyD2hn9i6rJOJuw3mk5bSdWyZ-DN96eKZjFPLZBR7mncf-UgY81vlRpBvsXnrZsOJA&usqp=CAU"
            ],
            "header": "Graffiti Art challenges social norms and political systems",
            "author": "Banksy",
            "tags": [
                "Graffiti Art",
                "Street Art"
            ],
            "date": new Date(1985, 12, 15),
            "category": 5,
            "info": "Graffiti Art is a form of visual expression that involves writing or drawings made on public surfaces, often without permission. Banksy, an anonymous British artist, is renowned for his politically charged and subversive graffiti artworks. His artwork 'Balloon Girl' depicts a young girl reaching for a heart-shaped balloon, symbolizing innocence and hope. Banksy's graffiti challenges social norms, political systems, and consumer culture, offering biting social commentary through clever and thought-provoking imagery. Graffiti Art represents a form of artistic activism and self-expression, reclaiming public spaces and sparking conversations about power, identity, and social justice."
        }
    ];

    replies: Reply[] = [
        {
            'id': 1, 'name': 'wqrwerwer', 'email': 'AndriySemeriak@gmail.com', 'comment': 'werwerwer',
            'date': new Date('Fri Jul 14 2023 13: 45: 58 GMT +0300(за східноєвропейським літнім часом'), 'postId': 12
        }, 
        {
            'id': 13, 'name': 'wqrwerwer', 'email': 'AndriySemeriak@gmail.com', 'comment': 'werwerwer',
            'date': new Date('Fri Jul 14 2023 13: 45: 58 GMT +0300(за східноєвропейським літнім часом'), 'postId': 12
        }, 
        {
            'id': 2, 'name': 'wqrwerwer', 'email': 'AndriySemeriak@gmail.com', 'comment': 'werwerwer',
            'date': new Date('Fri Jul 14 2023 13: 45: 58 GMT +0300(за східноєвропейським літнім часом'), 'postId': 11
        },
        {
            'id': 3, 'name': 'wqrwerwer', 'email': 'AndriySemeriak@gmail.com', 'comment': 'werwerwer',
            'date': new Date('Fri Jul 14 2023 13: 45: 58 GMT +0300(за східноєвропейським літнім часом'), 'postId': 10
        },
        {
            'id': 4, 'name': 'wqrwerwer', 'email': 'AndriySemeriak@gmail.com', 'comment': 'werwerwer',
            'date': new Date('Fri Jul 14 2023 13: 45: 58 GMT +0300(за східноєвропейським літнім часом'), 'postId': 9
        },
        {
            'id': 5, 'name': 'wqrwerwer', 'email': 'AndriySemeriak@gmail.com', 'comment': 'werwerwer',
            'date': new Date('Fri Jul 14 2023 13: 45: 58 GMT +0300(за східноєвропейським літнім часом'), 'postId': 8
        },
        {
            'id': 6, 'name': 'wqrwerwer', 'email': 'AndriySemeriak@gmail.com', 'comment': 'werwerwer',
            'date': new Date('Fri Jul 14 2023 13: 45: 58 GMT +0300(за східноєвропейським літнім часом'), 'postId': 7
        },
        {
            'id': 7, 'name': 'wqrwerwer', 'email': 'AndriySemeriak@gmail.com', 'comment': 'werwerwer',
            'date': new Date('Fri Jul 14 2023 13: 45: 58 GMT +0300(за східноєвропейським літнім часом'), 'postId': 6
        },
        {
            'id': 8, 'name': 'wqrwerwer', 'email': 'AndriySemeriak@gmail.com', 'comment': 'werwerwer',
            'date': new Date('Fri Jul 14 2023 13: 45: 58 GMT +0300(за східноєвропейським літнім часом'), 'postId': 5
        },
        {
            'id': 9, 'name': 'wqrwerwer', 'email': 'AndriySemeriak@gmail.com', 'comment': 'werwerwer',
            'date': new Date('Fri Jul 14 2023 13: 45: 58 GMT +0300(за східноєвропейським літнім часом'), 'postId': 4
        },
        {
            'id': 10, 'name': 'wqrwerwer', 'email': 'AndriySemeriak@gmail.com', 'comment': 'werwerwer',
            'date': new Date('Fri Jul 14 2023 13: 45: 58 GMT +0300(за східноєвропейським літнім часом'), 'postId': 3
        },
        {
            'id': 11, 'name': 'wqrwerwer', 'email': 'AndriySemeriak@gmail.com', 'comment': 'werwerwer',
            'date': new Date('Fri Jul 14 2023 13: 45: 58 GMT +0300(за східноєвропейським літнім часом'), 'postId': 2
        },
        {
            'id': 12, 'name': 'wqrwerwer', 'email': 'AndriySemeriak@gmail.com', 'comment': 'werwerwer',
            'date': new Date('Fri Jul 14 2023 13: 45: 58 GMT +0300(за східноєвропейським літнім часом'), 'postId': 1
        },
        
    ];

    comments:Comments[] = [
    {'comment':"asdasd",'date': new Date('Wed Jul 19 2023 15: 28: 50 GMT +0300(за східноєвропейським літнім часом)'), 
    'email': "saz9002@gmail.com", 'id': 1, 'name': "asdas", 'replyId':1
    },
    {'comment':"asdasd",'date': new Date('Wed Jul 19 2023 15: 28: 50 GMT +0300(за східноєвропейським літнім часом)'), 
    'email': "saz9002@gmail.com", 'id': 2, 'name': "asdas", 'replyId':2
    },
    {'comment':"asdasd",'date': new Date('Wed Jul 19 2023 15: 28: 50 GMT +0300(за східноєвропейським літнім часом)'), 
    'email': "saz9002@gmail.com", 'id': 3, 'name': "asdas", 'replyId':3
    },
    {'comment':"asdasd",'date': new Date('Wed Jul 19 2023 15: 28: 50 GMT +0300(за східноєвропейським літнім часом)'), 
    'email': "saz9002@gmail.com", 'id': 4, 'name': "asdas", 'replyId':4
    },
    {'comment':"asdasd",'date': new Date('Wed Jul 19 2023 15: 28: 50 GMT +0300(за східноєвропейським літнім часом)'), 
    'email': "saz9002@gmail.com", 'id': 5, 'name': "asdas", 'replyId':5
    },
    {'comment':"asdasd",'date': new Date('Wed Jul 19 2023 15: 28: 50 GMT +0300(за східноєвропейським літнім часом)'), 
    'email': "saz9002@gmail.com", 'id': 6, 'name': "asdas", 'replyId':6
    },
    {'comment':"asdasd",'date': new Date('Wed Jul 19 2023 15: 28: 50 GMT +0300(за східноєвропейським літнім часом)'), 
    'email': "saz9002@gmail.com", 'id': 7, 'name': "asdas", 'replyId':7
    },
    {'comment':"asdasd",'date': new Date('Wed Jul 19 2023 15: 28: 50 GMT +0300(за східноєвропейським літнім часом)'), 
    'email': "saz9002@gmail.com", 'id': 8, 'name': "asdas", 'replyId':8
    },
    {'comment':"asdasd",'date': new Date('Wed Jul 19 2023 15: 28: 50 GMT +0300(за східноєвропейським літнім часом)'), 
    'email': "saz9002@gmail.com", 'id': 9, 'name': "asdas", 'replyId':9
    },
    {'comment':"asdasd",'date': new Date('Wed Jul 19 2023 15: 28: 50 GMT +0300(за східноєвропейським літнім часом)'), 
    'email': "saz9002@gmail.com", 'id': 10, 'name': "asdas", 'replyId':10
    },
    {'comment':"asdasd",'date': new Date('Wed Jul 19 2023 15: 28: 50 GMT +0300(за східноєвропейським літнім часом)'), 
    'email': "saz9002@gmail.com", 'id': 11, 'name': "asdas", 'replyId':11
    },
    {'comment':"asdasd",'date': new Date('Wed Jul 19 2023 15: 28: 50 GMT +0300(за східноєвропейським літнім часом)'), 
    'email': "saz9002@gmail.com", 'id': 12, 'name': "asdas", 'replyId':12
    },
    ];
}
