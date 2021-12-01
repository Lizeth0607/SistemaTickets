
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
    const [Servicios, setServicios] = useState({id:null
        ,equipo_id:''
        ,indicador_id: ''
        ,problema: ''
        ,acciones: ''
        ,estado:''
        ,inicio: ''
        ,termino: ''

    
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
    setServicios({id:null
      ,equipo_id:''
      ,indicador_id: ''
      ,problema: ''
      ,acciones: ''
      ,estado:''
      ,inicio: ''
      ,termino: ''
    });
    formik.resetForm();
    };
    
    /**
    * Validación de las propiedades 
    *
    */
    const validate = () => {
    const errors = {};
     if (!Servicios.problema) {
    errors.txtProblema= t('Servicios:required.problema');
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
          <Column field="id" header={t('Servicios:label.id')} sortable={true}></Column>
          <Column field="equipo_id" header={t('Servicios:label.equipo')} sortable={true}></Column>
          <Column field="problema" header={t('Servicios:label.problema')} sortable={true}></Column>
          <Column field="estado" header={t('Servicios:label.estado')} sortable={true}></Column>
          <Column field="fecha_inicio" header={t('Servicios:label.fecha_inicio')} sortable={true}></Column>
          <Column field="fecha_termino" header={t('Servicios:label.fecha_termino')} sortable={true}></Column>
          <Column field="kpi" header={t('Servicios:label.indicador')} sortable={true}></Column>

          
          <Column body={actionTemplate} header={t('Servicios:rotulo.editar')}></Column>
       </DataTable>
       <Dialog header={t('Servicios:rotulo.agregar')} footer={dlgFooter} visible={dlgServicios} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgServicios(false)} blockScroll={false}>
          { Servicios  &&  
          <div>
             <div className="p-fluid p-formgrid p-grid">
             <div className="p-field p-col-12 p-md-12"><label htmlFor="txtEquipo">
                      {t('Servicios:label.equipo')}
                      </label>
                   {{captura} ? ( 
               <InputText id="txtEquipo" placeholder={t('Servicios:placeholder.equipo')} value={Servicios.equipo_id} className={formik.errors.txtEquipo ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('equipo_id', e.target.value)}></InputText>    

                ):(     <label id="txtEquipo">servicios.equipo_od</label>)}
    
                </div>

                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtIndicador">
                      {t('Servicios:label.indicador')}
                      </label>
                   {{captura} ? ( 
               <InputText id="txtIndicador" placeholder={t('Servicios:placeholder.indicador')} value={Servicios.indicador_id} className={formik.errors.txtEquipo ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('indicador_id', e.target.value)}></InputText>    

                ):(     <label id="txtIndicador">servicios.indicador_id</label>)}
    
                </div>
                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtProblema">
                      {t('Servicios:label.problema')}
                      </label>
                   {{captura} ? ( 
               <InputText id="txtProblema" placeholder={t('Servicios:placeholder.problema')} value={Servicios.problema} className={formik.errors.txtProblema ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('problema', e.target.value)}></InputText>    

                ):(     <label id="txtProblema">servicios.problema</label>)}
                  {formik.errors.txtProblema &&  <small id="txtProble-help" className="p-invalid">
                      {formik.errors.txtProblema}
                      </small>} 
                </div>
                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtAcciones">
                      {t('Servicios:label.acciones')}
                      </label>
                   {{captura} ? ( 
                <InputTextarea placeholder={t('Servicios:placeholder.acciones')} className={formik.errors.txtAcciones ? 'p-invalid':'p-inputtext'} value={Servicios.acciones} onChange={(e) =>  updateProperty('acciones', e.target.value)} rows={3} cols={20} autoResize />
                ):(     <label id="txtAcciones">servicios.acciones</label>)}
                    
                </div>
                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtEstado">
                      {t('Servicios:label.estado')}
                      </label>
                   {{captura} ? ( 
               <InputText id="txtEstado" placeholder={t('Servicios:placeholder.estado')} value={Servicios.estado} className={formik.errors.txtEstado ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('estado', e.target.value)}></InputText>    

                ):(     <label id="txtEstado">servicios.estado</label>)}
    
                </div>
                <div className="p-field p-col-12 p-md-6"><label htmlFor="txtFechaSolicitud">
                      {t('Servicios:label.fecha_inicio')}
                      </label>
                   {{captura} ? ( 
        
               <InputMask id="date" mask="9999-99-99"  slotChar="yyyy-mm-dd" placeholder={t('Servicios:placeholder.fecha_inicio')} value={Servicios.inicio} onChange={(e) =>   updateProperty('inicio', e.target.value)}></InputMask>
               ):(     <label id="txtFechaSolicitud">servicios.fecha_solicitud</label>)}
                           
                </div>
                <div className="p-field p-col-12 p-md-6"><label htmlFor="txtFechaTermino">
                      {t('Servicios:label.fecha_termino')}
                      </label>
                   {{captura} ? ( 
               <InputMask id="date" mask="9999-99-99"  slotChar="yyyy/mm/dd" placeholder={t('Servicios:placeholder.fecha_termino')} value={Servicios.termino} onChange={(e) =>   updateProperty('termino', e.target.value)}></InputMask>
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
    
    
    