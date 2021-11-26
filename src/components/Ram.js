
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

import Moment from 'react-moment';
import 'moment-timezone';
import RamService from '../service/RamService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';


const Ram = ()   =>   {
    const  [mensaje, setMensaje] = useState({
    title: '',
    text: '',
    icon: '',
    confirmButtonText: 'Aceptar',
    timer: '3000'
    });
    
    
    const [lstRam, setLstRam] = useState([]);
    const [errores, setErrores] = useState([]);
    const [dlgRam, setDlgRam] = useState(false);
    const [Ram, setRam] = useState({ram_id:null
    ,tipo:''
    ,capacidad:''
    ,medida:''
    
    });
    
    const [txtCriterio, setTxtCriterio] = useState('');
    const { t } = useTranslation(['translation','Ram']);
    const [captura, setCaptura] = useState(false);
    const ramService = new RamService(); //MODIFICAR SERVICES
    
    
    
    
    
    
    const ramSuccess = (severidad,cabecero,detalle)   =>   {
    let mensajeCopy = Object.assign({}, mensaje);
    mensajeCopy['title'] = cabecero;
    mensajeCopy['text'] = detalle;
    mensajeCopy['icon'] = severidad;
    setMensaje(mensajeCopy);
    Swal.fire(mensajeCopy);
    }
    
   
 
    
    const obtenerRam = ()   =>   { //MODIFICAR EN SERVICE
      ramService.obtenerRam ().then(data => setLstRam(data));
    };
    
    const seleccionaRam = (pRam)   =>   {
    setCaptura(false);
    formik.resetForm();
    ramService.seleccionaRam (pRam).then(data => setRam(data));
    setDlgRam(true);
    };
    
    useEffect(()   =>   {
    obtenerRam();
    },  [txtCriterio]);
    
    
    const agregaRam = ()   =>   {
    ramService.agregaRam (Ram).
    then(data => {setRam(data);
    ramSuccess('success',t('Ram:cabecero.exito'),t('Ram:mensaje.agregar'));
    setDlgRam(false);
    obtenerRam ();
    });
    };
    
    const eliminaRam = (pRam)   =>   {
    ramService.eliminaRam (pRam).then(data => setRam(data));
    ramSuccess('success',t('Ram:cabecero.exito'),t('Ram:mensaje.eliminar'));
    setDlgRam(false);
    obtenerRam();
    obtenerRam();
    obtenerRam();
    };
    
    const actualizaRam = ()   =>   {
    ramService.actualizaRam(Ram).
    then(data => { setDlgRam(false); obtenerRam();});
    };
    
    const updateProperty = (propiedad, valor)   =>  {
    let ramCopy = Object.assign({}, Ram);
    ramCopy[propiedad] = valor;
    setRam(ramCopy);
    };
    
    const iniciaRam = ()   =>   {
    setCaptura(true);
    iniciaComponentes();
    setDlgRam(true);
    };
    
    const iniciaComponentes = ()   =>   {
    setRam({ram_id:null
      ,tipo:''
      ,capacidad:''
      ,medida:''
    });
    formik.resetForm();
    };
    
    /**
    * Validación de las propiedades 
    *
    */
    const validate = () => {
    const errors = {};
     if (!Ram.tipo) {
    errors.txtTipoRam= t('Ram:required.tipoRam');
    }
    return errors;
    };
    
    const formik = useFormik({
    initialValues: {} ,
    validate,
    onSubmit: () => {
    if(captura){
    agregaRam();
    } else{
    actualizaRam();
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
       <Button type="button" icon="pi pi-trash" className="p-button-rounded" onClick={()  =>  {eliminaRam(rowData);} }></Button>
       <Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaRam(rowData); } }></Button>
       </div>);
    }
    
    
    
    const rightFooter = (
    
    <div className="p-grid p-fluid">
       <div className="p-col-12">
          <div className="p-inputgroup"><Button tooltip={t('Ram:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgRam(false) }></Button>                 
             { !captura   &&  <Button tooltip={t('Ram:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaRam }></Button>}                 
             { !captura   &&  <Button tooltip={t('Ram:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
             { captura   &&  <Button tooltip={t('Ram:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
             
          </div>
       </div>
    </div>    
    );
    
    const dlgFooter = 
    <Toolbar right={rightFooter}></Toolbar>;                 
    
    
    
    
    
    return (
    
    <div>
       <h1>
          <Trans i18nKey="Ram:entidad"></Trans>
       </h1>
       <div className="p-grid p-fluid">
          <div className="p-col-12 p-md-12">
             <div className="p-inputgroup">
                <InputText placeholder={t('Ram:placeholder.tipoRam')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('Ram:boton.agregar')} icon="pi pi-plus" onClick={iniciaRam}></Button></div>
          </div>
       </div>
       <DataTable value={lstRam} paginator={true} rows={10} responsive={true}>
          <Column field="ram_id" header={t('Ram:label.idRam')} sortable={true}></Column>
          <Column field="tipo" header={t('Ram:label.tipoRam')} sortable={true}></Column>
          <Column field="capacidad" header={t('Ram:label.capacidadRam')} sortable={true}></Column>
          <Column field="medida" header={t('Ram:label.capacidadRam')} sortable={true}></Column>
          <Column body={actionTemplate} header={t('Ram:rotulo.editar')}></Column>
       </DataTable>
       <Dialog header={t('Ram:rotulo.agregar')} footer={dlgFooter} visible={dlgRam} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgRam(false)} blockScroll={false}>
          { Ram  &&  
          <div>
             <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtTipoRam">
                      {t('Ram:label.tipoRam')}
                      </label>
                   {{captura} ? ( 
                   <InputText id="txtTipoRam" placeholder={t('Ram:placeholder.tipoRam')} value={Ram.tipo} className={formik.errors.txtTipoRam ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('tipo', e.target.value)}></InputText>    
                   ):(     <label id="txtTipoRam">ram.tipoRam</label>)}
                   
                   {formik.errors.txtTipoRam &&  <small id="txtTipoRam-help" className="p-invalid">
                      {formik.errors.txtTipoRam}
                      </small>}                 
                   
                </div>
                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtCapacidadRam">
                      {t('Ram:label.capacidadRam')}
                      </label>
                   {{captura} ? ( 
                   <InputText  id="txtCapacidadRam" placeholer={t('Ram:placeholder.capacidadRam')} value={Ram.capacidad} className={formik.errors.txtCapacidadRam ? 'p-invalid':'p-inputtext'}  onChange={(e) =>   updateProperty('capacidad', e.target.value)}></InputText>    
                   ):(     <label id="txtCapacidadRam">ram.capacidadRam</label>)}
                   
                </div>
                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtmedidaRam">
                      {t('Ram:label.capacidadRam')}
                      </label>
                   {{captura} ? ( 
                   <InputText  id="txtmedidaRam" placeholer={t('Ram:placeholder.capacidadRam')} value={Ram.medida} className={formik.errors.txtmedidaRam ? 'p-invalid':'p-inputtext'}  onChange={(e) =>   updateProperty('medida', e.target.value)}></InputText>    
                   ):(     <label id="txtmedidaRam">ram.capacidadRam</label>)}
                   
                </div>

             </div>
          </div>
          
          }
          
       </Dialog>
    </div>
    );
    
    
    
    }                
    export default Ram;                                        	
    
    
    