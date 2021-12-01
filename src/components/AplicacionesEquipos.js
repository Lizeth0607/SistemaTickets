
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
import AplicacionesService from '../service/AplicacionesService';
import EquiposService from '../service/EquiposService';

import axios from 'axios';



import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';
//import Component from '@fullcalendar/core/component/Component';

 
const AplicacionesEquipos = ()   =>   {
    const  [mensaje, setMensaje] = useState({
    title: '',
    text: '',
    icon: '',
    confirmButtonText: 'Aceptar',
    timer: '3000'
    });
    
    
    const [lstApps, setLstApps] = useState([]);
    const [lstDevices, setLstDevices] = useState([]);
    const [selectedApp, setSelectedApp]= useState(null);

   //Dropdown
    const url="http://127.0.0.1/api-soporte/public/equipo/index";
    const [equiposIndex, setEquiposIndex]=useState()
    const fecthApi = async()=>{
       const response = await fetch(url);
       console.log(response.status);
       const responseJson= await response.json();
       setEquiposIndex(responseJson);
       console.log(responseJson);

    }
    useEffect(() =>{
       fecthApi();
      }, [] )


    const [lstAplicacionesEqs, setLstAplicacionesEqs] = useState([]);
    const [errores, setErrores] = useState([]);
    const [dlgAplicacionesEqs, setDlgAplicacionesEqs] = useState(false);
    const [AplicacionesEqs, setAplicacionesEqs] = useState({id:null
    ,aplicacion_id:''
    ,equipo_id :''
   , instalacion:''
  
    });
    
    const [txtCriterio, setTxtCriterio] = useState('');
    const { t } = useTranslation(['translation','AplicacionesEquipos']);
    const [captura, setCaptura] = useState(false);
    const aplicacionesEqsService = new AplicacionesEquiposService(); //MODIFICAR SERVICES
    const apps = new AplicacionesService();
    const devices = new EquiposService();

   
    

    
    const aplicacionesEqsSuccess = (severidad,cabecero,detalle)   =>   {
    let mensajeCopy = Object.assign({}, mensaje);
    mensajeCopy['title'] = cabecero;
    mensajeCopy['text'] = detalle;
    mensajeCopy['icon'] = severidad;
    setMensaje(mensajeCopy);
    Swal.fire(mensajeCopy);
    }
    
    
    
    const obtenerApp = ()   =>   { //MODIFICAR EN SERVICE
      apps.obtenerApp ().then(data => setLstApps(data));
   };
   const obtenerEquipo = ()   =>   { //MODIFICAR EN SERVICE
      devices.obtenerEquipo ().then(data => setLstDevices(data));
   };
   
   const onAppChange = (e) => {
      setSelectedApp(e.value);
  }


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
   
    useEffect(()   =>   {
      obtenerApp();
      },);
      useEffect(()   =>   {
         obtenerEquipo();
         },);
    
    const agregaAplicacionEq = ()   =>   {
    aplicacionesEqsService.agregaAplicacionEq (AplicacionesEqs).then(data => {setAplicacionesEqs(data);
    aplicacionesEqsSuccess('success',t('AplicacionesEquipos:cabecero.exito'),t('AplicacionesEquipos:mensaje.agregar'));
    setDlgAplicacionesEqs(false);
    obtenerAplicacionEq ();
    });
    };
    
    const eliminaAplicacionEq = (pApps)   =>   {
      aplicacionesEqsService.eliminaAplicacionEq(pApps).then(data => setAplicacionesEqs(data));
      aplicacionesEqsSuccess('success',t('AplicacionesEquipos:cabecero.exito'),t('Aplicaciones:mensaje.eliminar'));
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
    setAplicacionesEqs({id:null
      ,aplicacion_id:''
      ,equipo_id :''
     , instalacion:''
                
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
    <div>
        <Button type="button" icon="pi pi-trash" className="p-button-rounded" onClick={()  =>  {eliminaAplicacionEq(rowData);} }></Button>
      <Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaAplicacionEq(rowData); } }></Button>
    </div>);
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
    let today = new Date();

    let invalidDates = [today];

    
    
    
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
          
         <Column field="id" header={t('AplicacionesEquipos:label.id')} sortable={true}></Column>
         <Column field="equipo_id" header={t('AplicacionesEquipos:label.id_app')} sortable={true}></Column>
         <Column field="aplicacion_id" header={t('AplicacionesEquipos:label.id_eq')} sortable={true}></Column>
         <Column field="fecha_instalacion" header={t('AplicacionesEquipos:label.fecha_instalacion')} sortable={true}></Column>


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
                        <InputMask id="txtfecha_instalacion" placeholder={t('AplicacionesEquipos:placeholder.fecha_instalacion')} value={AplicacionesEqs.instalacion} onChange={(e) => updateProperty('instalacion', e.target.value)} mask="9999-99-99"  slotChar="yyyy-mm-dd" ></InputMask>
                        ):(     <label id="txtfecha_instalacion">aplicacionesEqs.fec_inst</label>)}
                   
                </div>
                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtAplicacion">
                      {t('AplicacionesEquipos:label.id_app')}
                      </label>
                   {{captura} ? ( 
                <Dropdown onChange={onAppChange} value={selectedApp} optionValue="id" options={lstApps}  optionLabel="nombre"  placeholder={t('AplicacionesEquipos:placeholder.id_app')} />

                ):(     <label id="txtAplicacion">aplicacionesEqs.aplicacion_id</label>)}
    
                </div>
                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtEquipo">
                      {t('AplicacionesEquipos:label.id_eq')}
                      </label>
                   {{captura} ? ( 
               <InputText id="txtEquipo" placeholder={t('AplicacionesEquipos:placeholder.id_eq')} value={AplicacionesEqs.equipo_id} className={formik.errors.txtEquipo ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('equipo_id', e.target.value)}></InputText>    

                ):(     <label id="txtEquipo">aplicacionesEqs.equipo_id</label>)}
    
                </div>
                <div>
                   <ul>
                   {!equiposIndex ? "Cargando equipos":
                   equiposIndex.map((equipoIndex, index) =>{
                      return <li key={index}>{equipoIndex.estacion}</li>
                   })
                   }
                   </ul>
                </div>
             </div>
          </div>
          
          }
          
       </Dialog>
    </div>
    );
    
    
    
    }                
    export default AplicacionesEquipos;                                        	
    
    
    