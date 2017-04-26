let _ = require('lodash');

enum ImageSize {
    xsmall,
    small,
    medium,
    large,
    xLarge
}

class AmazonProductImage {
    uri: string;
    height: number;
    width: number;
    size: ImageSize;
    constructor(uri, height, width, size) {

    }
}

class AmazonProduct {
    listingId: string;
    price: number;
    formattedPrice: string;
    condition: string;
    description: string;
    link: string;
    pid: string;
    images: AmazonProductImage[];
    constructor(productPayload) {
        this.link = productPayload.DetailPageURL
    }

    makePid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

}


var sample = {
    "ASIN": "B013TOVA98",
    "DetailPageURL": "https://www.amazon.com/Mobile-Gundam-First-Blu-ray-Collection/dp/B013TOVA98%3FSubscriptionId%3DAKIAJTJZY5QMZ7Q4NIKA%26tag%3Dthef33dassoc-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB013TOVA98",
    "ItemLinks": {
        "ItemLink": [
            {
                "Description": "Technical Details",
                "URL": "https://www.amazon.com/Mobile-Gundam-First-Blu-ray-Collection/dp/tech-data/B013TOVA98%3FSubscriptionId%3DAKIAJTJZY5QMZ7Q4NIKA%26tag%3Dthef33dassoc-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3DB013TOVA98"
            },
            {
                "Description": "Add To Baby Registry",
                "URL": "https://www.amazon.com/gp/registry/baby/add-item.html%3Fasin.0%3DB013TOVA98%26SubscriptionId%3DAKIAJTJZY5QMZ7Q4NIKA%26tag%3Dthef33dassoc-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3DB013TOVA98"
            },
            {
                "Description": "Add To Wedding Registry",
                "URL": "https://www.amazon.com/gp/registry/wedding/add-item.html%3Fasin.0%3DB013TOVA98%26SubscriptionId%3DAKIAJTJZY5QMZ7Q4NIKA%26tag%3Dthef33dassoc-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3DB013TOVA98"
            },
            {
                "Description": "Add To Wishlist",
                "URL": "https://www.amazon.com/gp/registry/wishlist/add-item.html%3Fasin.0%3DB013TOVA98%26SubscriptionId%3DAKIAJTJZY5QMZ7Q4NIKA%26tag%3Dthef33dassoc-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3DB013TOVA98"
            },
            {
                "Description": "Tell A Friend",
                "URL": "https://www.amazon.com/gp/pdp/taf/B013TOVA98%3FSubscriptionId%3DAKIAJTJZY5QMZ7Q4NIKA%26tag%3Dthef33dassoc-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3DB013TOVA98"
            },
            {
                "Description": "All Customer Reviews",
                "URL": "https://www.amazon.com/review/product/B013TOVA98%3FSubscriptionId%3DAKIAJTJZY5QMZ7Q4NIKA%26tag%3Dthef33dassoc-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3DB013TOVA98"
            },
            {
                "Description": "All Offers",
                "URL": "https://www.amazon.com/gp/offer-listing/B013TOVA98%3FSubscriptionId%3DAKIAJTJZY5QMZ7Q4NIKA%26tag%3Dthef33dassoc-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3DB013TOVA98"
            }
        ]
    },
    "SmallImage": {
        "URL": "http://ecx.images-amazon.com/images/I/61Aesj38MYL._SL75_.jpg",
        "Height": {
            "#": "75",
            "@": {
                "Units": "pixels"
            }
        },
        "Width": {
            "#": "59",
            "@": {
                "Units": "pixels"
            }
        }
    },
    "MediumImage": {
        "URL": "http://ecx.images-amazon.com/images/I/61Aesj38MYL._SL160_.jpg",
        "Height": {
            "#": "160",
            "@": {
                "Units": "pixels"
            }
        },
        "Width": {
            "#": "126",
            "@": {
                "Units": "pixels"
            }
        }
    },
    "LargeImage": {
        "URL": "http://ecx.images-amazon.com/images/I/61Aesj38MYL.jpg",
        "Height": {
            "#": "500",
            "@": {
                "Units": "pixels"
            }
        },
        "Width": {
            "#": "395",
            "@": {
                "Units": "pixels"
            }
        }
    },
    "ImageSets": {
        "ImageSet": {
            "@": {
                "Category": "primary"
            },
            "SwatchImage": {
                "URL": "http://ecx.images-amazon.com/images/I/61Aesj38MYL._SL30_.jpg",
                "Height": {
                    "#": "30",
                    "@": {
                        "Units": "pixels"
                    }
                },
                "Width": {
                    "#": "24",
                    "@": {
                        "Units": "pixels"
                    }
                }
            },
            "SmallImage": {
                "URL": "http://ecx.images-amazon.com/images/I/61Aesj38MYL._SL75_.jpg",
                "Height": {
                    "#": "75",
                    "@": {
                        "Units": "pixels"
                    }
                },
                "Width": {
                    "#": "59",
                    "@": {
                        "Units": "pixels"
                    }
                }
            },
            "ThumbnailImage": {
                "URL": "http://ecx.images-amazon.com/images/I/61Aesj38MYL._SL75_.jpg",
                "Height": {
                    "#": "75",
                    "@": {
                        "Units": "pixels"
                    }
                },
                "Width": {
                    "#": "59",
                    "@": {
                        "Units": "pixels"
                    }
                }
            },
            "TinyImage": {
                "URL": "http://ecx.images-amazon.com/images/I/61Aesj38MYL._SL110_.jpg",
                "Height": {
                    "#": "110",
                    "@": {
                        "Units": "pixels"
                    }
                },
                "Width": {
                    "#": "87",
                    "@": {
                        "Units": "pixels"
                    }
                }
            },
            "MediumImage": {
                "URL": "http://ecx.images-amazon.com/images/I/61Aesj38MYL._SL160_.jpg",
                "Height": {
                    "#": "160",
                    "@": {
                        "Units": "pixels"
                    }
                },
                "Width": {
                    "#": "126",
                    "@": {
                        "Units": "pixels"
                    }
                }
            },
            "LargeImage": {
                "URL": "http://ecx.images-amazon.com/images/I/61Aesj38MYL.jpg",
                "Height": {
                    "#": "500",
                    "@": {
                        "Units": "pixels"
                    }
                },
                "Width": {
                    "#": "395",
                    "@": {
                        "Units": "pixels"
                    }
                }
            }
        }
    },
    "ItemAttributes": {
        "Actor": "-",
        "AudienceRating": "Unrated (Not Rated)",
        "Binding": "Blu-ray",
        "Brand": "BAYVIEW/WIDOWMAKER",
        "CatalogNumberList": {
            "CatalogNumberListElement": [
                "LNMN-B013TOVA98",
                "MN-B013TOVA98",
                "POMN-B013TOVA98"
            ]
        },
        "Director": "-",
        "EAN": "0742617155826",
        "EANList": {
            "EANListElement": "0742617155826"
        },
        "Format": [
            "Blu-ray",
            "Animated"
        ],
        "Genre": "Kids & Family",
        "IsAdultProduct": "0",
        "IsEligibleForTradeIn": "1",
        "ItemDimensions": {
            "Height": {
                "#": "540",
                "@": {
                    "Units": "hundredths-inches"
                }
            },
            "Length": {
                "#": "70",
                "@": {
                    "Units": "hundredths-inches"
                }
            },
            "Weight": {
                "#": "25",
                "@": {
                    "Units": "hundredths-pounds"
                }
            },
            "Width": {
                "#": "750",
                "@": {
                    "Units": "hundredths-inches"
                }
            }
        },
        "Label": "Bayview Entertainment",
        "Languages": {
            "Language": [
                {
                    "Name": "English",
                    "Type": "Published"
                },
                {
                    "Name": "English",
                    "Type": "Subtitled"
                },
                {
                    "Name": "English",
                    "Type": "Dubbed"
                },
                {
                    "Name": "Japanese",
                    "Type": "Original Language"
                }
            ]
        },
        "ListPrice": {
            "Amount": "4555",
            "CurrencyCode": "USD",
            "FormattedPrice": "$45.55"
        },
        "Manufacturer": "Bayview Entertainment",
        "Model": "34400048",
        "MPN": "17221299",
        "NumberOfDiscs": "2",
        "NumberOfItems": "2",
        "PackageDimensions": {
            "Height": {
                "#": "58",
                "@": {
                    "Units": "hundredths-inches"
                }
            },
            "Length": {
                "#": "710",
                "@": {
                    "Units": "hundredths-inches"
                }
            },
            "Weight": {
                "#": "18",
                "@": {
                    "Units": "hundredths-pounds"
                }
            },
            "Width": {
                "#": "542",
                "@": {
                    "Units": "hundredths-inches"
                }
            }
        },
        "PackageQuantity": "1",
        "PartNumber": "17221299",
        "ProductGroup": "DVD",
        "ProductTypeName": "ABIS_DVD",
        "PublicationDate": "2015-11-03",
        "Publisher": "Bayview Entertainment",
        "RegionCode": "1",
        "ReleaseDate": "2015-11-03",
        "RunningTime": {
            "#": "525",
            "@": {
                "Units": "minutes"
            }
        },
        "Studio": "Bayview Entertainment",
        "Title": "Mobile Suit Gundam (First Gundam) Part 1 Blu-ray Collection",
        "TradeInValue": {
            "Amount": "2921",
            "CurrencyCode": "USD",
            "FormattedPrice": "$29.21"
        },
        "UPC": "742617155826",
        "UPCList": {
            "UPCListElement": "742617155826"
        }
    },
    "OfferSummary": {
        "LowestNewPrice": {
            "Amount": "3919",
            "CurrencyCode": "USD",
            "FormattedPrice": "$39.19"
        },
        "LowestUsedPrice": {
            "Amount": "4499",
            "CurrencyCode": "USD",
            "FormattedPrice": "$44.99"
        },
        "TotalNew": "14",
        "TotalUsed": "2",
        "TotalCollectible": "0",
        "TotalRefurbished": "0"
    },
    "Offers": {
        "TotalOffers": "1",
        "TotalOfferPages": "1",
        "MoreOffersUrl": "https://www.amazon.com/gp/offer-listing/B013TOVA98%3FSubscriptionId%3DAKIAJTJZY5QMZ7Q4NIKA%26tag%3Dthef33dassoc-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D386001%26creativeASIN%3DB013TOVA98",
        "Offer": {
            "OfferAttributes": {
                "Condition": "New"
            },
            "OfferListing": {
                "OfferListingId": "bhpcFYXsBAVZcJY0f43y2U5NQNUp6EOsJcFcN%2Bd0kgdiaX%2FHevi4hu7hbK7YMuQnX9f3Tx1mN5pFHhx13WjZ7hEamkagdHcDe6GYGIbF9fuY5STVl%2BH8qw%3D%3D",
                "Price": {
                    "Amount": "4319",
                    "CurrencyCode": "USD",
                    "FormattedPrice": "$43.19"
                },
                "AmountSaved": {
                    "Amount": "236",
                    "CurrencyCode": "USD",
                    "FormattedPrice": "$2.36"
                },
                "PercentageSaved": "5",
                "Availability": "Usually ships in 24 hours",
                "AvailabilityAttributes": {
                    "AvailabilityType": "now",
                    "MinimumHours": "0",
                    "MaximumHours": "0"
                },
                "IsEligibleForSuperSaverShipping": "0",
                "IsEligibleForPrime": "1"
            }
        }
    },
    "CustomerReviews": {
        "IFrameURL": "https://www.amazon.com/reviews/iframe?akid=AKIAJTJZY5QMZ7Q4NIKA&alinkCode=xm2&asin=B013TOVA98&atag=thef33dassoc-20&exp=2016-12-05T19%3A14%3A58Z&v=2&sig=6%2BLDVNHRW1kEseT%2BTcO%2BwOkKPjNtTsRz4Fo%2Fqh1ZPRE%3D",
        "HasReviews": "true"
    },
    "EditorialReviews": {
        "EditorialReview": {
            "Source": "Product Description",
            "Content": "Available in high-definition on Blu-ray in North America for the first time - the series that launched one of the biggest anime franchises in history returns with an all-new transfer from the 35mm prints! Universal Century 0079. The rebel space colonies of the Principality of Zeon launch a war of independence against the Earth Federation, using humanoid fighting vehicles called mobile suits to overwhelm the Federation Forces and conquer half of Earth's surface. Months later, the Federation has finally developed its own prototype mobile suits at a remote space colony. But when the colony suffers a Zeon surprise attack, these new weapons fall into the hands of a motley crew of civilians and cadets, and fate places a youth named Amuro Ray at the controls of the white mobile suit Gundam. Contains episodes 1-21. Bonus features: Clean Opening, Clean Closing, and Blu-ray / DVD Commercials. English LPCM Stereo, Japanese LPCM Mono, English Subtitles",
            "IsLinkSuppressed": "0"
        }
    },
    "SimilarProducts": {
        "SimilarProduct": [
            {
                "ASIN": "B01A1T3RAY",
                "Title": "Mobile Suit Zeta Gundam Part 1 - Blu-Ray Collection"
            },
            {
                "ASIN": "B01B401PO4",
                "Title": "Mobile Suit Zeta Gundam Part 2 Collection [Blu-ray]"
            },
            {
                "ASIN": "B01HC8ZLV0",
                "Title": "Mobile Suit Gundam: Char's Counterattack Blu-ray"
            },
            {
                "ASIN": "B01CN38VP2",
                "Title": "Mobile Suit Gundam Zz Collection 1 [Blu-ray]"
            },
            {
                "ASIN": "B01G5VEM5Q",
                "Title": "Gundam Build Fighters Complete Blu-ray Collection"
            },
            {
                "ASIN": "B01IW8ML7Q",
                "Title": "Mobile Suit V Gundam - Blu-ray Collection 1"
            },
            {
                "ASIN": "B01CN39UL6",
                "Title": "After War Gundam X: Collection 1"
            },
            {
                "ASIN": "B01EU4VAGE",
                "Title": "After War Gundam X Collection 2 DVD"
            },
            {
                "ASIN": "B00XRFTE16",
                "Title": "Turn A Gundam: Part 2 DVD Collection"
            },
            {
                "ASIN": "B017LJFZR0",
                "Title": "Mobile Suit Gundam Movie: Trilogy DVD Set"
            }
        ]
    }
}
