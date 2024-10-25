import React, { useState, useEffect } from 'react';

const Create = (props) => {
    const { task, setTask } = props;

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTask(storedTasks);
    }, [setTask]);

    const submithandler = (e) => {
        e.preventDefault();

        if (!title || !price || !image) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        const newTask = { title, price, image };
        const updatedTasks = [...task, newTask];
        setTask(updatedTasks);

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        setTitle("");
        setPrice("");
        setImage(null);
    };

    return (
        <div>
            <div className="mb-10">
                <h1 className="typo mb-5 text-3xl font-extrabold text-center">
                    Product Banao...
                </h1>
                <form
                    onSubmit={submithandler}
                    className="bg-zinc-200 px-5 py-8 text-center w-[80%] m-auto"
                >
                    <input
                        type="text"
                        className="mb-5 block rounded-lg p-3 border w-1/2 m-auto"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <input
                        type="number"
                        className="mb-5 block rounded-lg p-3 border w-1/2 m-auto"
                        placeholder="Price"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                    <input
                        type="file"
                        className="mb-5 block w-1/2 m-auto"
                        onChange={(e) => setImage(e.target.files[0])} 
                    />
                    {image && (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className="object-cover m-auto w-20 h-20 mb-4"
                        />
                    )}
                    <button className="rounded px-5 py-2 text-white bg-black">
                        Ban gya kya?
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create;
