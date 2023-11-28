
const Contact = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-2xl flex items-center justify-center flex-col p-6 w-full  rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <input type="text" placeholder="Name" className="input input-bordered w-96 mt-2 max-w-xs" />
        <input type="email" placeholder="Email" className="input input-bordered w-96 mt-2 max-w-xs" />
        <textarea rows={5} className="textarea textarea-bordered w-80 mt-2" placeholder="Message"></textarea>
        <button className="btn mt-2 w-56">Send Message</button>

      </div>
    </div>
  )
}

export default Contact
