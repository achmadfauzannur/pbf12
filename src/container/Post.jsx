import React from "react";
import './Post.css';

const Post = (props) => {
    return(
        <div className = "artikel">
            <div className="gambar-artikel">
                <img src="http://placeimg.com/80/80/tech" alt="Gambar Tumbnail Artikel"/>
            </div>
            <div className="konten-artikel">
                <div className="nim-mahasiswa">Nim : {props.nama}</div>
                <p className = "nama-mahasiswa">Nama: {props.nim}</p>
                
                <button className="btn btn-sm btn-warning" 
                onClick={ ()=>{if(window.confirm('Apakah anda yakin akan menghapus data ini?')) props.hapusMahasiswa(props.idMahasiswa)}}>Hapus</button>
                <hr></hr>
            </div>
        </div>
    )
}

export default Post;
