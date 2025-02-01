"use client";

import ProductCard from "@/components/price-compare/productCard";
import { useState } from "react";

function PriceComparePage() {
    const [products, setProducts] = useState<ProductType[]>([
        {
            id: 1,
            label: "商品A",
            description: "商品情報",
            price: "",
            mount: "",
        },
        {
            id: 2,
            label: "商品B",
            description: "商品情報",
            price: "",
            mount: "",
        },
    ]);

    const updateProduct = (
        id: number,
        updatedProduct: Partial<ProductType>
    ) => {
        setProducts((prevProducts) =>
            prevProducts.map((prevProduct) =>
                prevProduct.id === id
                    ? { ...prevProduct, ...updatedProduct }
                    : prevProduct
            )
        );
    };

    const pricePerUnit = products.map((product) => {
        if (!product.mount || !product.price) return 0;
        return parseInt(product.mount) > 0
            ? parseInt(product.price) / parseInt(product.mount)
            : 0;
    });

    const priceDifference = Math.abs(pricePerUnit[0] - pricePerUnit[1]).toFixed(
        2
    ); // 小数点2桁に固定

    return (
        <div>
            <div
                role="input-space"
                className="flex w-full h-full justify-center items-center gap-8 mt-8"
            >
                {products.map((product, index) => {
                    return (
                        <ProductCard
                            key={index}
                            product={product}
                            onUpdate={(updatedProduct) =>
                                updateProduct(product.id, updatedProduct)
                            }
                        />
                    );
                })}
            </div>
            <div className="mt-8 p-4 border rounded-lg bg-gray-100 flex flex-col items-center">
                <h2 className="text-lg font-bold mb-2">比較結果</h2>
                <p>
                    {products[0].label}の内容量1あたりの金額:{" "}
                    {pricePerUnit[0].toFixed(2)}円
                </p>
                <p>
                    {products[1].label}の内容量1あたりの金額:{" "}
                    {pricePerUnit[1].toFixed(2)}円
                </p>
                {!!pricePerUnit[0] && !!pricePerUnit[1] && (
                    <p className="mt-4 font-bold text-red-500">
                        {pricePerUnit[0] < pricePerUnit[1]
                            ? products[0].label
                            : products[1].label}
                        が {priceDifference}円 安い
                    </p>
                )}
            </div>
        </div>
    );
}

export default PriceComparePage;
