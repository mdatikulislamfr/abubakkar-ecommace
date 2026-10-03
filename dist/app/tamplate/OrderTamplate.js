export default function OrderTamplate(order) {
    return `
        <b>🛍️ নতুন অর্ডার</b>
─────────────────────────
<b>
<pre>নাম       : ${order.name}
এলাকা     : ${order.area}
ঠিকানা     : ${order.addresh}
ফোন      : <a href="tel:${order.phone}">${order.phone}</a>
</pre>
</b>
<pre>
Product              Qty   Price
───────────────────────────────
${order.products.map((product) => `${product.name.padEnd(20).slice(0, 20)} ${String(product.quantity).padStart(3)}   ${product.price}৳`).join("\n")}
───────────────────────────────
Total                      ${order.total}৳
</pre>
`;
}
//# sourceMappingURL=OrderTamplate.js.map