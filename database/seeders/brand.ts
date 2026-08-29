import { Knex } from "knex";
export async function seed(knex: Knex): Promise<void> {
    await knex("products").del();
    await knex("products").insert([
        {
            "name": "ক্যাসিও",
            "slug": "casio",
            "code": "CAS",
            "description": "নির্ভরযোগ্য ও আধুনিক ডিজাইনের জন্য জনপ্রিয় জাপানি ঘড়ির ব্র্যান্ড।",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/7/72/Casio_logo.svg",
            "website": "https://www.casio.com",
            "status": 1,
            "sort_order": 1,
        },
        {
            "name": "সিটিজেন",
            "slug": "citizen",
            "code": "CIT",
            "description": "প্রযুক্তি, নির্ভুলতা ও মার্জিত ডিজাইনের জন্য পরিচিত জাপানি ঘড়ির ব্র্যান্ড।",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Citizen_Watch_logo.svg",
            "website": "https://www.citizenwatch.com",
            "status": 1,
            "sort_order": 2,

        },
        {
            "name": "সেইকো",
            "slug": "seiko",
            "code": "SEI",
            "description": "ঐতিহ্য, কারিগরি দক্ষতা ও নির্ভুলতার সমন্বয়ে তৈরি জাপানি ঘড়ির ব্র্যান্ড।",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Seiko_logo.svg",
            "website": "https://www.seikowatches.com",
            "status": 1,
            "sort_order": 3,

        },
        {
            "name": "ফসিল",
            "slug": "fossil",
            "code": "FOS",
            "description": "আধুনিক ফ্যাশন ও ক্লাসিক ডিজাইনের আকর্ষণীয় ঘড়ির জন্য পরিচিত ব্র্যান্ড।",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Fossil_logo.svg",
            "website": "https://www.fossil.com",
            "status": 1,
            "sort_order": 5,

        },
        {
            "name": "ওরিয়েন্ট",
            "slug": "orient",
            "code": "ORI",
            "description": "প্রিমিয়াম মেকানিক্যাল ঘড়ি ও ঐতিহ্যবাহী জাপানি কারিগরির জন্য পরিচিত।",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Orient_Watch_logo.svg",
            "website": "https://www.orient-watch.com",
            "status": 1,
            "sort_order": 6,

        },
        {
            "name": "স্ক্যাগেন",
            "slug": "skagen",
            "code": "SKA",
            "description": "সিম্পল, মিনিমাল ও আধুনিক ডিজাইনের স্টাইলিশ ঘড়ির ব্র্যান্ড।",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Skagen_logo.svg",
            "website": "https://www.skagen.com",
            "status": 1,
            "sort_order": 7,

        },
        {
            "name": "নেভিফোর্স",
            "slug": "naviforce",
            "code": "NAV",
            "description": "সাশ্রয়ী মূল্যে স্টাইলিশ ও আকর্ষণীয় ডিজাইনের ঘড়ির জনপ্রিয় ব্র্যান্ড।",
            "logo": "https://example.com/images/brands/naviforce.png",
            "website": "https://www.naviforce.com",
            "status": 1,
            "sort_order": 8,

        },
        {
            "name": "বক্সিং",
            "slug": "boxing",
            "code": "BOX",
            "description": "তরুণদের জন্য আধুনিক ডিজাইন ও দৈনন্দিন ব্যবহারের উপযোগী ঘড়ির ব্র্যান্ড।",
            "logo": "https://example.com/images/brands/boxing.png",
            "website": "https://example.com",
            "status": 1,
            "sort_order": 9,

        },
        {
            "name": "বেংলিং",
            "slug": "bengling",
            "code": "BEN",
            "description": "স্টাইলিশ ডিজাইন ও সাশ্রয়ী দামের বিভিন্ন ধরনের হাতঘড়ির ব্র্যান্ড।",
            "logo": "https://example.com/images/brands/bengling.png",
            "website": "https://example.com",
            "status": 1,
            "sort_order": 10,
        }
    ])

}