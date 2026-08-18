import { NextResponse } from "next/server";

export async function GET(request) {
    const dummyProducts = [
        {
            id: "prod_001",
            name: "Gold Plated Necklace Set",
            category: "Necklaces",
            images: [
                "https://via.placeholder.com/400x400.png?text=Necklace+1",
            ],
            description: "Elegant gold plated necklace with traditional design.",
            weight: "25g",
            purity: "22K Gold Plated",
            tags: ["bridal", "gold", "necklace"],
        },
        {
            id: "prod_002",
            name: "Kundan Bangles Pair",
            category: "Bangles",
            images: [
                "https://via.placeholder.com/400x400.png?text=Bangles+1",
            ],
            description: "Handcrafted kundan bangles, perfect for festive occasions.",
            weight: "40g",
            purity: "Kundan Work",
            tags: ["kundan", "bangles", "festive"],
        },
        {
            id: "prod_003",
            name: "Diamond Stud Earrings",
            category: "Earrings",
            images: [
                "https://via.placeholder.com/400x400.png?text=Earrings+1",
            ],
            description: "Classic diamond stud earrings for everyday elegance.",
            weight: "5g",
            purity: "18K Gold, VVS Diamond",
            tags: ["diamond", "earrings", "daily-wear"],
        },
    ];

    return NextResponse.json(
        {
            success: true,
            count: dummyProducts.length,
            products: dummyProducts,
        },
        {
            status: 200,
            headers: {
                // Testing ke liye abhi sabko allow kar rahe hain
                // Baad mein isko specific domain(s) tak restrict karna
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        }
    );
}

// Preflight request ke liye (browser kabhi kabhi OPTIONS call bhejta hai cross-origin pe)
export async function OPTIONS() {
    return NextResponse.json(
        {},
        {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        }
    );
}