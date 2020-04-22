import React,{Component} from 'react'
import {connect} from 'react-redux'
import *as tareasActions from '../../actions/tareasActions'
import Loader from '../general/Loader'
import Error from '../general/Error'
import {Link} from 'react-router-dom'

class Tareas extends Component{
    componentDidMount(){
        if(!Object.keys(this.props.tareas).length){
            this.props.traerTodas()
        }
        
    }
    mostrarContenido = () => {
        const {tareas,cargando,error} = this.props
        
        if(cargando){
            return <Loader />
        }
        if(error){
            return <Error mensaje={this.props.error}/>
        }

        return Object.keys(tareas).map((userId) => (
            <div key={userId}>
                <h2>Usuario {userId}</h2>
                <div className="contenedor-tareas">
                    {this.ponerTareas(userId)}
                </div>
            </div>
        ))
    }

    ponerTareas = (userId) => {
        const {tareas} = this.props
        const porUsuario = {
            ...tareas[userId],
        }

        return Object.keys(porUsuario).map((tar_Id) =>(
            <div key={tar_Id}>
                <input type="checkbox" defaultChecked={porUsuario[tar_Id].completed} />
                {porUsuario[tar_Id].title}
            </div>
        ))
    }

    render(){
        return(
            <div>
                <Link to='/tareas/guardar'>
                    <button>Agregar</button>
                </Link>
                {this.mostrarContenido()}
            </div>
        )
    }
}

const mapStateToProps = ({tareasReducer}) => tareasReducer

export default connect(mapStateToProps,tareasActions)(Tareas)