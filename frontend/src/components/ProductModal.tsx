import { useEffect, useState } from "react";

export type ProductForm = {
  _id?: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image?: string;
};

type Props = {
  open: boolean;
  mode: "add" | "edit";
  initial?: ProductForm | null;
  onClose: () => void;
  onSave: (data: ProductForm) => void;
};

export default function ProductModal({
  open,
  mode,
  initial,
  onClose,
  onSave,
}: Props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<string>("0");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    setError(null);
    setTitle(initial?.title ?? "");
    setPrice(String(initial?.price ?? 0));
    setImage(initial?.image ?? "");
    setCategory(initial?.category ?? "");
    setDescription(initial?.description ?? "");
  }, [open, initial]);

  if (!open) return null;

  const handleSave = () => {
    setError(null);

    if (!title.trim() || !category.trim() || !description.trim()) {
      setError("Require fields missing.");
      return;
    }

    const p = Number(price);
    if (Number.isNaN(p) || p < 0) {
      setError("Price must be a valid number.");
      return;
    }

    onSave({
      _id: initial?._id,
      title: title.trim(),
      price: p,
      image: image.trim() || undefined,
      category: category,
      description: description,
    });

    setTitle("");
    setCategory("");
    (setDescription(""), setImage(""));
    setPrice("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg rounded-2xl bg-neutral-900 border border-white/10 p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold">
            {mode === "add" ? "Add Product" : "Edit Product"}
          </h3>

          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="mt-5 space-y-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">
              Title
              <span className="text-red-500 font-bold te">*</span>
            </label>
            <input
              className="w-full rounded-full bg-white/10 border border-white/10 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Product title"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">
              Description
              <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="textarea"
              className="w-full rounded-full bg-white/10 border border-white/10 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product description"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">
              Category
              <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              className="w-full rounded-full bg-white/10 border border-white/10 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Product Category"
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">
              Price
              <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full rounded-full bg-white/10 border border-white/10 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">
              Image URL
            </label>
            <input
              className="w-full rounded-full bg-white/10 border border-white/10 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-full bg-white/10 border border-white/10 px-5 py-2.5 text-sm hover:bg-white/15 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded-full bg-[#A259FF] hover:bg-[#A259FF]/90 px-6 py-2.5 text-sm font-semibold transition"
          >
            {mode === "add" ? "Create" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
