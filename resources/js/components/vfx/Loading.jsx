import './Loading.css';

export default function CatLoader() {
    return (
        <div className="loader-wrapper">
            <div className="loader"></div>
            <p className="loading-text">Memuat...</p>
        </div>
    );
}