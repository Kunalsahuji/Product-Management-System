import React, { useState } from 'react';

const Show = ({ task, setTask }) => {
    const [isEditing, setIsEditing] = useState(null);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const startEditing = (index) => {
        setIsEditing(index);
        setTitle(task[index].title || "");
        setPrice(task[index].price || null);
        setImage(task[index].image || null);

        if (task[index].image instanceof File) {
            setImagePreview(URL.createObjectURL(task[index].image));
        } else {
            setImagePreview(null);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const saveUpdate = (index) => {
        if (!title || !price || !image) {
            alert("Please fill in all fields before updating.");
            return;
        }

        const updatedTask = [...task];
        updatedTask[index] = { title, price, image };
        setTask(updatedTask);
        localStorage.setItem("tasks", JSON.stringify(updatedTask));

        setIsEditing(null);
        resetFields();
    };

    const deleteProduct = (index) => {
        const updatedTask = task.filter((_, i) => i !== index);
        setTask(updatedTask);
        localStorage.setItem("tasks", JSON.stringify(updatedTask));
    };

    const resetFields = () => {
        setTitle("");
        setPrice(null);
        setImage(null);
        setImagePreview(null);
    };

    return (
        <div className="w-[80%] m-auto mt-5">
            <h2 className="text-center text-2xl font-extrabold mb-5">Products List</h2>

            {task.length > 0 ? (
                task.map((item, index) => (
                    <div key={index} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-lg">
                        {isEditing === index ? (
                            <>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="block mb-2 p-2 border rounded w-full"
                                    placeholder="Update Title"
                                />
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="block mb-2 p-2 border rounded w-full"
                                    placeholder="Update Price"
                                />
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="block mb-2 p-2 border rounded w-full"
                                />
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview" className="object-cover w-20 h-20 mb-2" />
                                )}
                                <button
                                    onClick={() => saveUpdate(index)}
                                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    mast h...
                                </button>
                                <button
                                    onClick={() => setIsEditing(null)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    hata de bhai
                                </button>
                            </>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold">{item.title || "No Title"}</h3>
                                <p>Price: {item.price ? `$${item.price}` : "No Price"}</p>
                                {item.image instanceof File ? (
                                    <img
                                        src={URL.createObjectURL(item.image)}
                                        alt="Product"
                                        className="object-cover w-20 h-20 mb-2"
                                    />
                                ) : (
                                    <p>No Image</p>
                                )}
                                <button
                                    onClick={() => startEditing(index)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    badalte h yar
                                </button>
                                <button
                                    onClick={() => deleteProduct(index)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    delete mar
                                </button>
                            </>
                        )}
                    </div>
                ))
            ) : (
                <p className="text-center text-red-500">No products available. Please add some products.</p>
            )}
        </div>
    );
};

export default Show;
