
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
import { addLocale } from 'primereact/api';

import Moment from 'react-moment';
import 'moment-timezone';
import ServiciosService from '../service/ServiciosService';
import EquiposService from '../service/EquiposService';


import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';
//import { arrayToHash } from '@fullcalendar/core/util/object';


const Servicios = ()   =>   {
    const  [mensaje, setMensaje] = useState({
    title: '',
    text: '',
    icon: '',
    confirmButtonText: 'Aceptar',
    timer: '3000'
    });
    
    //TextArea
    const [value1, setValue1] = useState('');
   
    const [lstDevices, setLstDevices] = useState([]);
    const [lstServicios, setLstServicios] = useState([]);
    const [errores, setErrores] = useState([]);
    const [dlgServicios, setDlgServicios] = useState(false);
    const [Servicios, setServicios] = useState({servicio_id:null
        ,servicio:''
        ,descripcion: ''
        ,prioridad: ''
        ,estado: ''
        ,fecha_solicitud: ''
        ,fecha_termino: ''
        ,equipo_id: ''
        ,usuario_id: ''

    
    });
    
    const [txtCriterio, setTxtCriterio] = useState('');
    const { t } = useTranslation(['translation','Servicios']);
    const [captura, setCaptura] = useState(false);
    const serviciosService = new ServiciosService(); //MODIFICAR SERVICES
    const devices = new EquiposService();
 
    
    let today = new Date();

    let invalidDates = [today];

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Claro'
    });
    
    
    const serviciosSuccess = (severidad,cabecero,detalle)   =>   {
    let mensajeCopy = Object.assign({}, mensaje);
    mensajeCopy['title'] = cabecero;
    mensajeCopy['text'] = detalle;
    mensajeCopy['icon'] = severidad;
    setMensaje(mensajeCopy);
    Swal.fire(mensajeCopy);
    }
    
   
 
    
    const obtenerServicio = ()   =>   { //MODIFICAR EN SERVICE
        serviciosService.obtenerServicio ().then(data => setLstServicios(data));
    };
    const obtenerEquipo = ()   =>   { //MODIFICAR EN SERVICE
      devices.obtenerEquipo ().then(data => setLstDevices(data));
   };
    const seleccionaServicio = (pServicios)   =>   {
    setCaptura(false);
    formik.resetForm();
    serviciosService.seleccionaServicio (pServicios).then(data => setServicios(data));
    setDlgServicios(true);
    };
    
    useEffect(()   =>   {
    obtenerServicio();
    },  [txtCriterio]);
    
      useEffect(()   =>   {
         obtenerEquipo();
         },);
         
    const agregaServicio = ()   =>   {
    serviciosService.agregaServicio (Servicios).then(data => {setServicios(data);
    serviciosSuccess('success',t('Servicios:cabecero.exito'),t('Servicios:mensaje.agregar'));
    setDlgServicios(false);
    obtenerServicio ();
    });
    };
    
    const eliminaServicio = (pServicios)   =>   {
        serviciosService.eliminaServicio (pServicios);
    serviciosSuccess('success',t('Servicios:cabecero.exito'),t('Servicios:mensaje.eliminar'));
    setDlgServicios(false);
    obtenerServicio();
    obtenerServicio();
    };
    
    const actualizaServicio = ()   =>   {
    serviciosService.actualizaServicio(Servicios).
    then(data => { setDlgServicios(false); obtenerServicio();});
    };
    
    const updateProperty = (propiedad, valor)   =>  {
    let servicioCopy = Object.assign({}, Servicios);
    servicioCopy[propiedad] = valor;
    setServicios(servicioCopy);
    };
    
    const iniciaServicios = ()   =>   {
    setCaptura(true);
    iniciaComponentes();
    setDlgServicios(true);
    };
    
    const iniciaComponentes = ()   =>   {
    setServicios({servicio_id:null
        ,servicio:''
        ,descripcion: ''
        ,prioridad: ''
        ,estado: ''
        ,fecha_solicitud: ''
        ,fecha_termino: ''
        ,equipo_id: ''
        ,usuario_id: ''
    });
    formik.resetForm();
    };
    
    /**
    * Validación de las propiedades 
    *
    */
    const validate = () => {
    const errors = {};
     if (!Servicios.servicio) {
    errors.txtDescServicio= t('Servicios:required.descServicio');
    }
    return errors;
    };
    
    const formik = useFormik({
    initialValues: {} ,
    validate,
    onSubmit: () => {
    if(captura){
    agregaServicio();
    } else{
    actualizaServicio();
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
        <Button type="button" icon="pi pi-trash" className="p-button-rounded" onClick={()  =>  {eliminaServicio(rowData);} }></Button>
        <Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaServicio(rowData); } }></Button>
        </div>);
    }
    
    
    
    const rightFooter = (
    
    <div className="p-grid p-fluid">
       <div className="p-col-12">
          <div className="p-inputgroup"><Button tooltip={t('Servicios:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgServicios(false) }></Button>                 
             { !captura   &&  <Button tooltip={t('Servicios:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaServicio }></Button>}                 
             { !captura   &&  <Button tooltip={t('Servicios:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
             { captura   &&  <Button tooltip={t('Servicios:boton.agregar')} type="submit" icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
             
          </div>
       </div>
    </div>    
    );
    
    const dlgFooter = 
    <Toolbar right={rightFooter}></Toolbar>;                 
    
    
    
    
    
    return (
    
    <div>
       <h1>
          <Trans i18nKey="Servicios:entidad"></Trans>
       </h1>                                                                                                        
       <div className="p-grid p-fluid">
          <div className="p-col-12 p-md-12">
             <div className="p-inputgroup">
                <InputText placeholder={t('Servicios:placeholder.nombreServicio')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('Servicios:boton.agregar')} icon="pi pi-plus" onClick={iniciaServicios}></Button></div>
          </div>
       </div>
      
       <DataTable value={lstServicios} paginator={true} rows={10} responsive={true}>
          <Column field="servicio_id" header={t('Servicios:label.idServicio')} sortable={true}></Column>
          <Column field="equipo_id" header={t('Servicios:label.idEquipo')} sortable={true}></Column>
          <Column field="fecha_solicitud" header={t('Servicios:label.fechaSolicitud')} sortable={true}></Column>
          <Column field="fecha_termino" header={t('Servicios:label.fechaTermino')} sortable={true}></Column>
        
          
          <Column body={actionTemplate} header={t('Servicios:rotulo.editar')}></Column>
       </DataTable>
       <Dialog header={t('Servicios:rotulo.agregar')} footer={dlgFooter} visible={dlgServicios} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgServicios(false)} blockScroll={false}>
          { Servicios  &&  
          <div>
             <div className="p-fluid p-formgrid p-grid">
             <div className="p-field p-col-12 p-md-12"><label htmlFor="txtIdEquipo">
                      {t('Servicios:label.idEquipo')}
                      </label>
                   {{captura} ? ( 
           <Dropdown  options={lstDevices} value={Servicios.equipo_id}  optionLabel="equipo" placeholder={t('Servicios:placeholder.idEquipo')} onChange={(e) => updateProperty('equipo', e.target.value)} />
           ):(    <label id="txtIdEquipo">servicios.equipo_id</label>)}
                   
                </div>
                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtDescServicio">
                      {t('Servicios:label.descServicio')}
                      </label>
                   {{captura} ? ( 
                <InputTextarea placeholder={t('Servicios:placeholder.descServicio')} className={formik.errors.txtDescServicio ? 'p-invalid':'p-inputtext'} value={Servicios.descripcion} onChange={(e) =>  updateProperty('descripcion', e.target.value)} rows={3} cols={20} autoResize />
                ):(     <label id="txtDescServicio">servicios.descripcion</label>)}
                   {formik.errors.txtDescServicio &&  <small id="txtDescServicio-help" className="p-invalid">
                      {formik.errors.txtDescServicio}
                      </small>}  
                </div>
                
                <div className="p-field p-col-12 p-md-6"><label htmlFor="txtFechaSolicitud">
                      {t('Servicios:label.fechaSolicitud')}
                      </label>
                   {{captura} ? ( 
        
                        <Calendar id="disableddays" placeholder={t('Servicios:placeholder.fechaSolicitud')} value={Servicios.fecha_solicitud} onChange={(e) => updateProperty('fecha_solicitud', e.target.value)} disabledDates={invalidDates} disabledDays={[0, 6]} readOnlyInput />
                        ):(     <label id="txtFechaSolicitud">servicios.fecha_solicitud</label>)}
                   
                </div>
                <div className="p-field p-col-12 p-md-6"><label htmlFor="txtFechaTermino">
                      {t('Servicios:label.fechaTermino')}
                      </label>
                   {{captura} ? ( 
                        <Calendar id="disableddays" placeholder={t('Servicios:placeholder.fechaTermino')} value={Servicios.fecha_termino} onChange={(e) => updateProperty('fecha_termino', e.target.value)} disabledDates={invalidDates} disabledDays={[0, 6]} readOnlyInput />
                        ):(     <label id="txtFechaTermino">servicios.fecha_termino</label>)}
                   
                </div>

                
                
             </div>
             
  

          </div>
          
          }
          
       </Dialog>
    </div>
    );
    
    
    
    }                
    export default Servicios;                                        	
    
    
    