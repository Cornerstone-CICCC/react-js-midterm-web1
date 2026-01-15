import { useMemo, useState } from "react";
import ProductModal, { type ProductForm } from "../components/ProductModal";
import { toast } from "react-toastify";

type Product = {
  _id: string;
  title: string;
  price: number;
  image?: string;
};

const demoProducts: Product[] = [
  {
    _id: "1",
    title: "Bag",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1520975958225-8a8b8f1a0b35?w=200&h=200&fit=crop",
  },
  {
    _id: "2",
    title: "Ruben Carder",
    price: 10.99,
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&h=200&fit=crop",
  },
  {
    _id: "3",
    title: "Zain Dokidis",
    price: 12.4,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
  },
];

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [query, setQuery] = useState("");

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editing, setEditing] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.title.toLowerCase().includes(q));
  }, [products, query]);

  const openAdd = () => {
    setModalMode("add");
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setModalMode("edit");
    setEditing(p);
    setModalOpen(true);
  };

  const onSave = (data: ProductForm) => {
    if (modalMode === "add") {
      const newProduct: Product = {
        _id: crypto.randomUUID(),
        title: data.title,
        price: data.price,
        image: data.image,
      };

      setProducts((prev) => [newProduct, ...prev]);
      toast.success("Product created successfully!");
    } else {
      if (!editing) return;

      setProducts((prev) =>
        prev.map((p) =>
          p._id === editing._id
            ? { ...p, title: data.title, price: data.price, image: data.image }
            : p
        )
      );

      toast.success("Product updated successfully!");
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const ok = confirm("Delete this product?");
    if (!ok) return;

    setProducts((prev) => prev.filter((p) => p._id !== id));
    toast.success("Product deleted.");
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-neutral-950 text-white">
      <div className="h-full w-full px-5 py-8 md:px-10 md:py-10">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Admin Dashboard
          </h1>
        </div>

        <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-160px)] rounded-2xl bg-neutral-900/60 border border-white/10 p-5 md:p-7 overflow-hidden">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl md:text-2xl font-medium">All Products</h2>

            <button
              onClick={openAdd}
              className="rounded-full bg-purple-600 hover:bg-purple-700 px-6 py-2.5 font-semibold transition"
            >
              Add +
            </button>
          </div>

          <div className="mt-5">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search product..."
              className="w-full rounded-full bg-white/10 border border-white/10 px-5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mt-6 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/60">
            <div className="grid grid-cols-[48px_1fr_90px] md:grid-cols-[60px_1fr_140px_200px] items-center">
              <div>#</div>
              <div className="md:hidden">Product</div>
              <div className="hidden md:block">Product Name</div>
              <div className="text-left">Price</div>
              <div className="hidden md:block text-right">Actions</div>
            </div>
          </div>

          <div className="mt-4 h-[calc(100%-190px)] overflow-auto pr-1 space-y-4">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
                No products found.
              </div>
            ) : (
              filtered.map((p, idx) => (
                <div
                  key={p._id}
                  className="rounded-2xl bg-white/10 border border-white/5 px-4 py-4 md:px-5"
                >
                  <div className="grid grid-cols-[48px_1fr_90px] md:grid-cols-[60px_1fr_140px_200px] items-center gap-2">
                    <div className="flex items-center justify-center">
                      <div className="h-9 w-9 rounded-full bg-black/30 border border-white/10 flex items-center justify-center text-white/70">
                        {idx + 1}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-12 w-12 rounded-full bg-black/30 border border-white/10 overflow-hidden flex-shrink-0">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.title}
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold truncate">{p.title}</div>
                        <div className="text-xs text-white/50 truncate">
                          ID: {p._id}
                        </div>
                      </div>
                    </div>

                    <div className="text-left font-medium text-emerald-400">
                      {p.price.toFixed(2)}
                    </div>

                    <div className="hidden md:flex justify-end gap-5 text-sm">
                      <button
                        onClick={() => openEdit(p)}
                        className="text-white/80 hover:text-white underline underline-offset-4"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-white/80 hover:text-red-300 underline underline-offset-4"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ProductModal
        open={modalOpen}
        mode={modalMode}
        initial={
          editing
            ? {
                _id: editing._id,
                title: editing.title,
                price: editing.price,
                image: editing.image,
              }
            : null
        }
        onClose={() => setModalOpen(false)}
        onSave={onSave}
      />
    </div>
  );
}
