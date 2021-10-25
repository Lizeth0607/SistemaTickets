
import React, {  useEffect, useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputMask } from "primereact/inputmask";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import Swal from 'sweetalert2';
import { ToggleButton } from 'primereact/togglebutton';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { AutoComplete } from 'primereact/autocomplete';
import Moment from 'react-moment';
import 'moment-timezone';
import AplicacionesEquiposService from '../service/AplicacionesEquiposService';
import axios from 'axios';
import { EquiposDatosService }  from '../service/EquiposDatosService';
import  AplicacionesDatosService  from '../service/AplicacionesDatosService';


import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';


const AplicacionesEquipos = ()   =>   {
    const  [mensaje, setMensaje] = useState({
    title: '',
    text: '',
    icon: '',
    confirmButtonText: 'Aceptar',
    timer: '3000'
    });
    
    
    const [lstAplicacionesEqs, setLstAplicacionesEqs] = useState([]);
    const [errores, setErrores] = useState([]);
    const [dlgAplicacionesEqs, setDlgAplicacionesEqs] = useState(false);
    const [AplicacionesEqs, setAplicacionesEqs] = useState({instalacion_id:null
    ,fecha_instalacion:''
    ,aplicacion_id:''
    ,equipo_id:''
    });
    
    const [txtCriterio, setTxtCriterio] = useState('');
    const { t } = useTranslation(['translation','AplicacionesEquipos']);
    const [captura, setCaptura] = useState(false);
    const aplicacionesEqsService = new AplicacionesEquiposService(); //MODIFICAR SERVICES
    
    
    //Autocomplete
const [equipos, setEquipos] = useState([]);
const [selectedEquipos, setSelectedEquipos] = useState(null);
const [filteredEquipos, setFilteredEquipos] = useState(null);
const equiposDatosService = new EquiposDatosService();

const itemsEquipos = Array.from({ length: 100000 }).map((_, i) => ({ label: `Item #${i}`, value: i }));

useEffect(() => {
    equiposDatosService.getEquipos().then(data => setEquipos(data));
}, []); 

const searchEquipo = (event) => {
    setTimeout(() => {
        let _filteredEquipos;
        if (!event.query.trim().length) {
            _filteredEquipos = [...equipos];
        }
        else {
            _filteredEquipos = equipos.filter((equipos) => {
                return equipos.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }

        setFilteredEquipos(_filteredEquipos);
    }, 250);
}
const itemTemplateEquipos = (item) => {
   return (
       <div className="equipo-item">
           <div>{item.name}</div>
       </div>
   );
}

//Autocomplete 2
const [aplicaciones, setAplicaciones] = useState([]);
const [selectedAplicaciones, setSelectedAplicaciones] = useState(null);
const [filteredAplicaciones, setFilteredAplicaciones] = useState(null);
const aplicacionesDatosService = new AplicacionesDatosService();

const itemsAplicacion = Array.from({ length: 100000 }).map((_, i) => ({ label: `Item #${i}`, value: i }));

useEffect(() => {
    aplicacionesDatosService.getAplicacionesEqs().then(data => setAplicaciones(data));
}, []); 

const searchAplicacion = (event) => {
    setTimeout(() => {
        let _filteredAplicaciones;
        if (!event.query.trim().length) {
            _filteredAplicaciones = [...aplicaciones];
        }
        else {
            _filteredAplicaciones = aplicaciones.filter((aplicaciones) => {
                return aplicaciones.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }

        setFilteredAplicaciones(_filteredAplicaciones);
    }, 250);
}

    

const itemTemplateAplicaciones = (item) => {
    return (
        <div className="aplicacion-item">
            <div>{item.name}</div>
        </div>
    );
}





    
    const aplicacionesEqsSuccess = (severidad,cabecero,detalle)   =>   {
    let mensajeCopy = Object.assign({}, mensaje);
    mensajeCopy['title'] = cabecero;
    mensajeCopy['text'] = detalle;
    mensajeCopy['icon'] = severidad;
    setMensaje(mensajeCopy);
    Swal.fire(mensajeCopy);
    }
    
    //TextArea
    const [value1, setValue1] = useState('');
    
    
    
    
    const obtenerAplicacionEq = ()   =>   { //MODIFICAR EN SERVICE
      aplicacionesEqsService.obtenerAplicacionEq ().then(data => setLstAplicacionesEqs(data));
   };
    
    const seleccionaAplicacionEq = (pAplicacionEq)   =>   {
    setCaptura(false);
    formik.resetForm();
    aplicacionesEqsService.seleccionaAplicacionEq (pAplicacionEq).then(data => setAplicacionesEqs(data));
    setDlgAplicacionesEqs(true);
    };
    
    useEffect(()   =>   {
    obtenerAplicacionEq();
    },  [txtCriterio]);
    
    
    const agregaAplicacionEq = ()   =>   {
    aplicacionesEqsService.agregaAplicacionEq (AplicacionesEqs).then(data => {setAplicacionesEqs(data);
    aplicacionesEqsSuccess('success',t('AplicacionesEquipos:cabecero.exito'),t('AplicacionesEquipos:mensaje.agregar'));
    setDlgAplicacionesEqs(false);
    obtenerAplicacionEq ();
    });
    };
    
    const eliminaAplicacionEq = ()   =>   {
    AplicacionesEqs.eliminaAplicacionEq (AplicacionesEqs);
    aplicacionesEqsSuccess('success',t('DiscosEquipos:cabecero.exito'),t('DiscosEquipos:mensaje.eliminar'));
    setDlgAplicacionesEqs(false);
    obtenerAplicacionEq();
    obtenerAplicacionEq();
    };
    
    const actualizaAplicacionEq = ()   =>   {
    aplicacionesEqsService.actualizaAplicacionEq(AplicacionesEqs).
    then(data => { setDlgAplicacionesEqs(false); obtenerAplicacionEq();});
    };
    
    const updateProperty = (propiedad, valor)   =>  {
    let aplicacionesEqsCopy = Object.assign({}, AplicacionesEqs);
    aplicacionesEqsCopy[propiedad] = valor;
    setAplicacionesEqs(aplicacionesEqsCopy);
    };
    
    const iniciaAplicacionesEqs = ()   =>   {
    setCaptura(true);
    iniciaComponentes();
    setDlgAplicacionesEqs(true);
    };
    
    const iniciaComponentes = ()   =>   {
    setAplicacionesEqs({instalacion_id:null
        ,fecha_instalacion:''
        ,aplicacion_id:''
        ,equipo_id:''

    });
    formik.resetForm();
    };
    
    /**
    * Validación de las propiedades 
    *
    */
    const validate = () => {
    const errors = {};
     if (!AplicacionesEqs.txtfecha_instalacion) {
    errors.txtfecha_instalacion= t('AplicacionesEquipos:required.fecha_instalacion');
    }
    return errors;
    };
    
    const formik = useFormik({
    initialValues: {} ,
    onSubmit: () => {
    if(captura){
    agregaAplicacionEq();
    } else{
    actualizaAplicacionEq();
    }
    },
    });
    
    const fechaTemplate = (rowData, column)   =>   {
    return (
    <div>
       <Moment format={t('formato.fechaHora')}>
          {rowData.fechaAlta ? rowData.fechaAlta: null}
          
       </Moment>
    </div>);      
    }
    
    
    const actionTemplate = (rowData, column)   =>   {
    return (
    <div><Button type="button" icon="pi pi-search" className="p-button-rounded" onClick={()  =>  {seleccionaAplicacionEq(rowData);} }></Button><Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaAplicacionEq(rowData); } }></Button></div>);
    }
    
    
    
    const rightFooter = (
    
    <div className="p-grid p-fluid">
       <div className="p-col-12">
          <div className="p-inputgroup"><Button tooltip={t('AplicacionesEquipos:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgAplicacionesEqs(false) }></Button>                 
             { !captura   &&  <Button tooltip={t('AplicacionesEquipos:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaAplicacionEq }></Button>}                 
             { !captura   &&  <Button tooltip={t('AplicacionesEquipos:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
             { captura   &&  <Button tooltip={t('AplicacionesEquipos:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
             
          </div>
       </div>
    </div>    
    );
    
    const dlgFooter = 
    <Toolbar right={rightFooter}></Toolbar>;                 
    
    
    
    
    
    return (
    
    <div>
       <h1>
          <Trans i18nKey="AplicacionesEquipos:entidad"></Trans>
       </h1>
       <div className="p-grid p-fluid">
          <div className="p-col-12 p-md-12">
             <div className="p-inputgroup">
                <InputText placeholder={t('AplicacionesEquipos:placeholder.instalacion_id')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('AplicacionesEquipos:boton.agregar')} icon="pi pi-plus" onClick={iniciaAplicacionesEqs}></Button></div>
          </div>
       </div>
       <DataTable value={lstAplicacionesEqs} paginator={true} rows={10} responsive={true}>
          <Column field="instalacion_id" header={t('AplicacionesEquipos:label.instalacion_id')} sortable={true}></Column>
          <Column field="fecha_instalacion" header={t('AplicacionesEquipos:label.fecha_instalacion')} sortable={true}></Column>
          <Column field="aplicacion_id" header={t('AplicacionesEquipos:label.aplicacion_id')} sortable={true}></Column>
          <Column field="equipo_id" header={t('AplicacionesEquipos:label.idEquipo')} sortable={true}></Column>

          <Column body={actionTemplate} header={t('AplicacionesEquipos:rotulo.editar')}></Column>
       </DataTable>
       <Dialog header={t('AplicacionesEquipos:rotulo.agregar')} footer={dlgFooter} visible={dlgAplicacionesEqs} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgAplicacionesEqs(false)} blockScroll={false}>
          { AplicacionesEqs  &&  
          <div>
             <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtfecha_instalacion">
                      {t('AplicacionesEquipos:label.fecha_instalacion')}
                      </label>
                   {{captura} ? ( 
                    <InputText id="txtfecha_instalacion" value={AplicacionesEqs.fecha_instalacion} onChange={(e) => updateProperty('fecha_instalacion', e.target.value)}  mask="99/99/9999"/>
                    ):(     <label id="txtfecha_instalacion">aplicacionesEqs.fecha_instalacion</label>)}
               
                   {formik.errors.txtfecha_instalacion  &&  <small id="txtfecha_instalacion-help" className="p-invalid">
                      {formik.errors.txtfecha_instalacion}
                      </small>}                 
                   
                </div>
               
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtIdEquioo">
                  {t('AplicacionesEquipos:label.idEquipo')}
                  </label>
               {{captura} ? ( 
            <InputText id="txtfecha_instalacion" value={AplicacionesEqs.aplicacion_id} onChange={(e) => updateProperty('aplicacion_id', e.target.value)}  mask="99/99/9999"/>
            ):(     <label id="txtIdEquipo">aplicacionesEqs.idEquipo</label>)}
               
            </div>  
            <div className="p-field p-col-12 p-md-6"><label htmlFor="txtaplicacion_id">
                  {t('AplicacionesEquipos:label.aplicacion_id')}
                  </label>
               {{captura} ? ( 
            <InputText id="txtfecha_instalacion" value={AplicacionesEqs.equipo_id} onChange={(e) => updateProperty('equipo_id', e.target.value)}  mask="99/99/9999"/>
            ):(     <label id="txtaplicacion_ides">aplicacionesEqs.aplicacion_id</label>)}
               
            </div> 
             </div>
          </div>
          
          }
          
       </Dialog>
    </div>
    );
    
    
    
    }                
    export default AplicacionesEquipos;                                        	
    
    
    