import { useEffect, useMemo, useState } from "react";
import ProductModal, { type ProductForm } from "../components/ProductModal";
import { toast } from "react-toastify";
import AdminLayout from "../layouts/AdminLayout";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProductById,
  type IProduct,
} from "../api/products";

type Product = {
  _id: string;
  title: string;
  price: number;
  image?: string;
  category: string;
  description: string;
};

// const demoProducts: Product[] = [
//   {
//     _id: "1",
//     title: "Bag",
//     price: 9.99,

//   },
//   {
//     _id: "2",
//     title: "Ruben Carder",
//     price: 10.99,
//   },
//   {
//     _id: "3",
//     title: "Zain Dokidis",
//     price: 12.4,
//   },
// ];

export default function AdminDashboard() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [query, setQuery] = useState("");
  const [update, setUpdate] = useState(false);
  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editing, setEditing] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.title.toLowerCase().includes(q));
  }, [products, query]);

  const fetchProducts = async () => {
    const data = await getAllProducts();

    if (!data) return;

    setProducts(data);
  };

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

  //Handle create and update
  const onSave = async (data: ProductForm) => {
    if (!data) return;

    const { _id, title, price, description, category, image } = data;
    if (modalMode === "add") {
      const newProduct: Partial<IProduct> = {
        title,
        price,
        description,
        category,
        image,
      };

      //create
      const result = await addProduct(newProduct);

      if (!result) {
        console.log("Unable to create product");
        toast.error("Unable to create product");
        return;
      }

      setProducts((prev) => [result, ...prev]);
      toast.success("Product created successfully!");
    } else {
      if (!editing) return;

      if (!_id) {
        console.log("Product id is missing");
        return;
      }

      const updates = {
        title,
        category,
        description,
        image,
        price,
      };

      //update product
      const result = await updateProductById(_id, updates);

      if (!result) {
        toast.error("Failed to update product");
        return;
      }

      setProducts((prev) =>
        prev.map((p) =>
          p._id === result._id
            ? {
                ...p,
                title,
                price,
                image: image ? image : "",
                category,
                description,
              }
            : p,
        ),
      );

      setUpdate((prev) => !prev);
      toast.success("Product updated successfully!");
    }

    setModalOpen(false);
  };

  //Handle delete
  const handleDelete = async (id: string) => {
    const ok = confirm("Delete this product?");
    if (!ok) return;

    const deletedProduct = await deleteProduct(id);

    if (!deletedProduct) {
      toast.error("Unable to delete Product, please try again");
      return;
    }

    setProducts((prev) => prev.filter((p) => p._id !== id));
    toast.success("Product deleted.");
  };

  //First load
  useEffect(() => {
    fetchProducts();
  }, [update]);
  return (
    <AdminLayout
      title="Admin Dashboard"
      subtitle="Manage products and keep your store updated."
    >
      {/* Content area (AdminLayout already handles full screen) */}
      <div className="h-full w-full px-5 py-8 md:px-10 md:py-10">
        {/* Panel (fills remaining height under AdminLayout top bar) */}
        <div className="h-full rounded-2xl bg-[#2B2B2B] border border-white/10 p-5 md:p-7 overflow-hidden">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl md:text-2xl font-medium">All Products</h2>

            <button
              onClick={openAdd}
              className="rounded-full bg-[#A259FF] hover:bg-[#A259FF]/90 px-6 py-2.5 font-semibold transition"
            >
              Add +
            </button>
          </div>

          <div className="mt-5">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search product..."
              className="w-full rounded-full bg-white/10 border border-white/10 px-5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#A259FF]"
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

          {/* Scroll area */}
          <div className="mt-4 h-[calc(100%-190px)] overflow-y-scroll no-scrollbar pr-1 space-y-4">
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
                      <div className="h-12 w-12 rounded-full bg-[#3B3B3B] border border-white/10 overflow-hidden flex-shrink-0">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="bg-[#3B3B3B] text-[#858584] text-xs text-center self-center h-12 w-12 border border-white/10 rounded-full ">
                            No Image
                          </div>
                        )}
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
                  category: editing.category,
                  description: editing.description,
                }
              : null
          }
          onClose={() => setModalOpen(false)}
          onSave={onSave}
        />
      </div>
    </AdminLayout>
  );
}
