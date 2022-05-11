import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Modal } from "../context/modal/modal";
import Splash from "../components/home";


function Home() {
  // const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const closeModal = () => {
    setShowModal(false);
  }
  return (
    <main className="main_container fade_in">
      <header id="top" className="section">
        <h2>Hello, World!</h2>
        <section>
          <p>
            This is the beginning of my lfg app!
          </p>
        </section>
        <h3>Table of Contents</h3>
        <ul className="list">
          <li>
            <a className="scroll" href="#parks">
              Parks - {window.location.origin + "/api/parks"}
            </a>
          </li>
          <li>
            <a className="scroll" href="#cocktails">
              Cocktails - {window.location.origin + "/api/cocktails"}
            </a>
          </li>
        </ul>
      </header>
      <Splash />
        <img
          style={{ cursor: "pointer" }}
          onClick={() => {
            setModalImage("/random.jpeg");
            setShowModal(!showModal);
          }}
          className="image"
          src={"/random.jpeg"}
          alt="Park test example"
        />
      {showModal && (
        <Modal onClose={closeModal}>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setShowModal(!showModal)}
            className="modal_image"
            src={modalImage}
            alt="Park test example"
          />
        </Modal>
      )}
    </main>
  );
}

export default Home;