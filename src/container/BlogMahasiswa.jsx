import React, {Component} from 'react';
import './BlogMahasiswa.css';
import Post from './Post';
import firebase from "firebase";
import firebaseConfig from "../firebase/config";

class BlogMahasiswa extends Component{
    constructor(props){
        super(props);
        // firebase.initializeApp(firebaseConfig);
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
         }else {
            firebase.app(); // if already initialized, use that one
         }
        this.state={
            listMahasiswa:[]
        }
    }

    //FETCHING DENGAN URL
    ambilDataDariServerApiMahasiswaBlog = () => {
        let ref = firebase.database().ref("/");
        ref.on("value", snapshot => {
            const state = snapshot.val();
            this.setState(state);
        });
    }

    simpanDataKeServerAPI = () => {
        firebase.database()
        .ref("/")
        .set(this.state);
    }

    componentDidMount(){
        this.ambilDataDariServerApiMahasiswaBlog()
    }

    componentDidUpdate(prevProps, prevStates){
        if (prevStates !== this.state){
            this.simpanDataKeServerAPI();
        }
    }

        //arrow function DELETE
        handleHapusMahasiswa = (idMahasiswa) =>{
            const {listMahasiswa} = this.state;
            const newState = listMahasiswa.filter(data => {
                return data.uid !== idMahasiswa;
            });
            this.setState({listMahasiswa: newState});
        }

    //arrow function SAVE
    handleTombolSimpan = (event) =>{
        let name = this.refs.namaMahasiswa.value;
        let nim = this.refs.nimMahasiswa.value;
        let uid = this.refs.uid.value;
        
        if(uid&& name&& nim){
            const {listMahasiswa} = this.state;
            const indeksArtikel = listMahasiswa.findIndex(data =>{
                return data.uid === uid;
            })
        } else if(name && nim){
            const uid = new Date().getTime().toString();
            const {listMahasiswa} = this.state;
            listMahasiswa.push({uid,name,nim});
            this.setState({listMahasiswa});
        }

        this.refs.namaMahasiswa.value ="";
        this.refs.nimMahasiswa.value ="";
        this.refs.uid.value ="";
    }


    render(){
        return(
            <div className="post-mahasiswa">
            <div className="from pb-2 border bottom">
                <div className="from-group now">
                    <label htmlFor="nim" className="col-sm2 col-form-label">Nama Mahasiswa</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="name" name="name" ref="namaMahasiswa"/>
                    </div>
                </div>

                <div className="from-group row">
                    <label htmlFor="nama" className="col-sm-2 col-form-label">NIM</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control" id="nim" name="nim" ref="nimMahasiswa"/>
                    </div>
                </div>
              <input type="hidden" name="uid" ref="uid"/>  
               <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>

            </div>
            <h2>Daftar Mahasiswa</h2>
           {
               this.state.listMahasiswa.map(mahasiswa => {
                   return <Post key={mahasiswa.uid} nama={mahasiswa.name} nim={mahasiswa.nim} idMahasiswa={mahasiswa.uid} hapusMahasiswa={this.handleHapusMahasiswa}/>
               })
           } 
            
        </div>
        )
    }
}

export default BlogMahasiswa;
