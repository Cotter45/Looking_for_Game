import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Modal } from "../context/modal/modal";
import Splash from "../components/home";
import MonitorDefault from "../components/home/monitor_default";
// import isProductionImage from "../util/is_production_image";


function Home() {
  // const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [display, setDisplay] = useState('');

  const closeModal = () => {
    setShowModal(false);
  }
  return (
    <main className="main_container fade_in">
      <header id="top">
        <div className="monitor">
          <div className="monitor_screen">
            {!display && <MonitorDefault />}
            {display === "sign_up" && <h2 className="fade_in">Sign Up</h2>}
            {display === "sign_in" && <h2 className="fade_in">Sign In</h2>}
          </div>
          <div className="monitor_stand">
            <div className="stand"></div>
            <div className="base"></div>
          </div>
        </div>
        <div className="controller_body">
          <div className="stick">
            <div className="stick_rod"></div>
            <div className="stick_under"></div>
          </div>
          <div onClick={() => setDisplay("sign_up")} className="select">
            Sign Up
          </div>
          <div onClick={() => setDisplay("sign_in")} className="start">Sign In</div>
          <div className="under_buttonA">
            <div className="select_button">A</div>
          </div>
          <div onClick={() => setDisplay("")} className="under_buttonB">
            <div className="back_button">B</div>
          </div>
          <div className="left_handle"></div>
          <div className="right_handle"></div>
        </div>
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