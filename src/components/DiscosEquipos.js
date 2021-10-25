
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
import DiscosService from '../service/DiscosService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';


const DiscosEquipos = ()   =>   {
    const  [mensaje, setMensaje] = useState({
    title: '',
    text: '',
    icon: '',
    confirmButtonText: 'Aceptar',
    timer: '3000'
    });
    
    
    const [lstDiscos, setLstDiscos] = useState([]);
    const [errores, setErrores] = useState([]);
    const [dlgDiscos, setDlgDiscos] = useState(false);
    const [Discos, setDiscos] = useState({idDisco:null
    ,tipoDisco:''
    ,capacidadDisco:''
    ,medidaDisco:''
    });
    
    const [txtCriterio, setTxtCriterio] = useState('');
    const { t } = useTranslation(['translation','DiscosEquipos']);
    const [captura, setCaptura] = useState(false);
    const discosService = new DiscosService(); //MODIFICAR SERVICES
    
    
    
    
    
    
    const discosSuccess = (severidad,cabecero,detalle)   =>   {
    let mensajeCopy = Object.assign({}, mensaje);
    mensajeCopy['title'] = cabecero;
    mensajeCopy['text'] = detalle;
    mensajeCopy['icon'] = severidad;
    setMensaje(mensajeCopy);
    Swal.fire(mensajeCopy);
    }
    
    //TextArea
    const [value1, setValue1] = useState('');
    
    
    
    
    const obtenerDisco = ()   =>   { //MODIFICAR EN SERVICE
      discosService.obtenerDisco ().then(data => setLstDiscos(data));
   };
    
    const seleccionaDisco = (pDiscos)   =>   {
    setCaptura(false);
    formik.resetForm();
    discosService.seleccionaDisco (pDiscos).then(data => setDiscos(data));
    setDlgDiscos(true);
    };
    
    useEffect(()   =>   {
    obtenerDisco();
    },  [txtCriterio]);
    
    
    const agregaDisco = ()   =>   {
    discosService.agregaDisco (Discos).
    then(data => {setDiscos(data);
    discosSuccess('success',t('DiscosEquipos:cabecero.exito'),t('DiscosEquipos:mensaje.agregar'));
    setDlgDiscos(false);
    obtenerDisco ();
    });
    };
    
    const eliminaCategoria = ()   =>   {
    Discos.eliminaCategoria (Discos);
    discosSuccess('success',t('DiscosEquipos:cabecero.exito'),t('DiscosEquipos:mensaje.eliminar'));
    setDlgDiscos(false);
    obtenerDisco();
    obtenerDisco();
    };
    
    const actualizaDisco = ()   =>   {
    discosService.actualizaDisco(Discos).
    then(data => { setDlgDiscos(false); obtenerDisco();});
    };
    
    const updateProperty = (propiedad, valor)   =>  {
    let discoCopy = Object.assign({}, Discos);
    discoCopy[propiedad] = valor;
    setDiscos(discoCopy);
    };
    
    const iniciaDiscos = ()   =>   {
    setCaptura(true);
    iniciaComponentes();
    setDlgDiscos(true);
    };
    
    const iniciaComponentes = ()   =>   {
    setDiscos({idDisco:null
       ,tipoDisco:''
       ,capacidadDisco:''
       ,medidaDisco:''

    });
    formik.resetForm();
    };
    
    /**
    * Validación de las propiedades 
    *
    */
    const validate = () => {
    const errors = {};
     if (!Discos.tipoDisco) {
    errors.txtTipoDisco= t('DiscosEquipos:required.tipoDisco');
    }
    return errors;
    };
    
    const formik = useFormik({
    initialValues: {} ,
    validate,
    onSubmit: () => {
    if(captura){
    agregaDisco();
    } else{
    actualizaDisco();
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
    <div><Button type="button" icon="pi pi-search" className="p-button-rounded" onClick={()  =>  {seleccionaDisco(rowData);} }></Button><Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaDisco(rowData); } }></Button></div>);
    }
    
    
    
    const rightFooter = (
    
    <div className="p-grid p-fluid">
       <div className="p-col-12">
          <div className="p-inputgroup"><Button tooltip={t('DiscosEquipos:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgDiscos(false) }></Button>                 
             { !captura   &&  <Button tooltip={t('DiscosEquipos:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaCategoria }></Button>}                 
             { !captura   &&  <Button tooltip={t('DiscosEquipos:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
             { captura   &&  <Button tooltip={t('DiscosEquipos:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
             
          </div>
       </div>
    </div>    
    );
    
    const dlgFooter = 
    <Toolbar right={rightFooter}></Toolbar>;                 
    
    
    
    
    
    return (
    
    <div>
       <h1>
          <Trans i18nKey="DiscosEquipos:entidad"></Trans>
       </h1>
       <div className="p-grid p-fluid">
          <div className="p-col-12 p-md-12">
             <div className="p-inputgroup">
                <InputText placeholder={t('DiscosEquipos:placeholder.tipoDisco')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('DiscosEquipos:boton.agregar')} icon="pi pi-plus" onClick={iniciaDiscos}></Button></div>
          </div>
       </div>
       <DataTable value={lstDiscos} paginator={true} rows={10} responsive={true}>
          <Column field="disco_id" header={t('DiscosEquipos:label.idDisco')} sortable={true}></Column>
          <Column field="tipo" header={t('DiscosEquipos:label.tipoDisco')} sortable={true}></Column>
          <Column field="capacidad" header={t('DiscosEquipos:label.capacidadDisco')} sortable={true}></Column>
          <Column field="medida" header={t('DiscosEquipos:label.medidaDisco')} sortable={true}></Column>

          <Column body={actionTemplate} header={t('DiscosEquipos:rotulo.editar')}></Column>
       </DataTable>
       <Dialog header={t('DiscosEquipos:rotulo.agregar')} footer={dlgFooter} visible={dlgDiscos} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgDiscos(false)} blockScroll={false}>
          { Discos  &&  
          <div>
             <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtTipoDisco">
                      {t('DiscosEquipos:label.tipoDisco')}
                      </label>
                   {{captura} ? ( 
                   <InputText id="txtTipoDisco" placeholder={t('DiscosEquipos:placeholder.tipoDisco')} value={Discos.tipoDisco} className={formik.errors.txtTipoDisco ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('tipoDisco', e.target.value)}></InputText>    
                   ):(     <label id="txtTipoDisco">discos.tipoDisco</label>)}
                   
                   {formik.errors.txtTipoDisco  &&  <small id="txtTipoDisco-help" className="p-invalid">
                      {formik.errors.txtTipoDisco}
                      </small>}                 
                   
                </div>
                
                <div className="p-field p-col-12 p-md-6"><label htmlFor="txtCapacidadDisco">
                      {t('DiscosEquipos:label.capacidadDisco')}
                      </label>
                   {{captura} ? ( 
                   <InputNumber  id="txtCapacidadDisco" placeholer={t('DiscosEquipos:placeholder.capacidadDisco')} value={Discos.capacidadDisco} className={formik.errors.txtCapacidadDisco ? 'p-invalid':'p-inputtext'}  /*onChange={(e) =>   updateProperty('capacidadDisco', e.target.value)}*/></InputNumber>    
                   ):(     <label id="txtCapacidadDisco">discos.capacidadCateg</label>)}
                   
                </div>
                <div className="p-field p-col-12 p-md-6"><label htmlFor="txtMedidaDisco">
                  {t('DiscosEquipos:label.medidaDisco')}
                  </label>
               {{captura} ? ( 
                  <InputText id="txtMedidaDisco" placeholder={t('DiscosEquipos:placeholder.medidaDisco')} value={Discos.medidaDisco} className={formik.errors.txtMedidaDisco ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('medidaDisco', e.target.value)}></InputText>    
                  ):(     <label id="txtMedidaDisco">discos.medidaDisco</label>)}
                  
            </div>
                    
             </div>
          </div>
          
          }
          
       </Dialog>
    </div>
    );
    
    
    
    }                
    export default DiscosEquipos;                                        	
    
    
    