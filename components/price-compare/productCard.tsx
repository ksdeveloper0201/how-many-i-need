"use client";

import React, { useMemo, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProductCardProp = {
    product: ProductType;
    onUpdate: (updatedProduct: Partial<ProductType>) => void;
};

function ProductCard({ product, onUpdate }: ProductCardProp) {
    const [editLabel, setEditLabel] = useState<boolean>(false);
    const [editDescription, setEditDescription] = useState<boolean>(false);

    const pricePerMount = useMemo(() => {
        if (!product.price || !product.mount) return 0;
        return product.price / product.mount;
    }, [product.price, product.mount]);

    return (
        <div>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2 justify-between">
                        <CardTitle>
                            {editLabel ? (
                                <Input
                                    type="text"
                                    value={product.label}
                                    onChange={(e) =>
                                        onUpdate({ label: e.target.value })
                                    }
                                />
                            ) : (
                                product.label
                            )}
                        </CardTitle>
                        <FaRegEdit onClick={() => setEditLabel(!editLabel)} />
                    </div>
                    <div className="flex items-center gap-2 justify-between">
                        <Label>
                            {editDescription ? (
                                <Input
                                    type="text"
                                    value={product.description}
                                    onChange={(e) =>
                                        onUpdate({
                                            description: e.target.value,
                                        })
                                    }
                                />
                            ) : (
                                product.description
                            )}
                        </Label>
                        <FaRegEdit
                            onClick={() => setEditDescription(!editDescription)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="flex-col flex gap-4">
                    <div>
                        <Label>金額</Label>
                        <Input
                            type="number"
                            value={product.price || 0}
                            onChange={(e) =>
                                onUpdate({ price: parseInt(e.target.value) })
                            }
                        />
                    </div>
                    <div>
                        <Label>内容量</Label>
                        <Input
                            type="number"
                            value={product.mount || 0}
                            onChange={(e) =>
                                onUpdate({ mount: parseInt(e.target.value) })
                            }
                        />
                    </div>
                    <div className="">
                        <Label>内容量1に対する金額</Label>
                        <p className="text-center">{pricePerMount}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ProductCard;
