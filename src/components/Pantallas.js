
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
import PantallasService from '../service/PantallasService';

import { useTranslation , Trans} from 'react-i18next';
import { useFormik } from 'formik';

import { Skeleton } from 'primereact/skeleton';


const Pantallas = ()   =>   {
    const  [mensaje, setMensaje] = useState({
    title: '',
    text: '',
    icon: '',
    confirmButtonText: 'Aceptar',
    timer: '3000'
    });
    
    
    const [lstPantallas, setLstPantallas] = useState([]);
    const [errores, setErrores] = useState([]);
    const [dlgPantallas, setDlgPantallas] = useState(false);
    const [Pantallas, setPantallas] = useState({pantalla_id:null
    ,tipo:''
    ,tamano:''
    
    });
    
    const [txtCriterio, setTxtCriterio] = useState('');
    const { t } = useTranslation(['translation','Pantallas']);
    const [captura, setCaptura] = useState(false);
    const pantallasService = new PantallasService(); //MODIFICAR SERVICES
    
    
    
    
    
    
    const pantallasSuccess = (severidad,cabecero,detalle)   =>   {
    let mensajeCopy = Object.assign({}, mensaje);
    mensajeCopy['title'] = cabecero;
    mensajeCopy['text'] = detalle;
    mensajeCopy['icon'] = severidad;
    setMensaje(mensajeCopy);
    Swal.fire(mensajeCopy);
    }
    
   
 
    
    const obtenerPantalla = ()   =>   { //MODIFICAR EN SERVICE
    pantallasService.obtenerPantalla ().then(data => setLstPantallas(data));
    };
    
    const seleccionaPantalla = (pPantallas)   =>   {
    setCaptura(false);
    formik.resetForm();
    pantallasService.seleccionaPantalla (pPantallas).then(data => setPantallas(data));
    setDlgPantallas(true);
    };
    
    useEffect(()   =>   {
    obtenerPantalla();
    },  [txtCriterio]);
    
    
    const agregaPantalla = ()   =>   {
    pantallasService.agregaPantalla (Pantallas).then(data => {setPantallas(data);
    pantallasSuccess('success',t('Pantallas:cabecero.exito'),t('Pantallas:mensaje.agregar'));
    setDlgPantallas(false);
    obtenerPantalla ();
    });
    };
    
    const eliminaPantalla = (pPantallas)   =>   {
      pantallasService.eliminaPantalla (pPantallas).then(data => setPantallas(data));
    pantallasSuccess('success',t('Pantallas:cabecero.exito'),t('Pantallas:mensaje.eliminar'));
    setDlgPantallas(false);
    obtenerPantalla();
    obtenerPantalla();
    };
    
    const actualizaPantalla = ()   =>   {
    pantallasService.actualizaPantalla(Pantallas).
    then(data => { setDlgPantallas(false); obtenerPantalla();});
    };
    
    const updateProperty = (propiedad, valor)   =>  {
    let pantallaCopy = Object.assign({}, Pantallas);
    pantallaCopy[propiedad] = valor;
    setPantallas(pantallaCopy);
    };
    
    const iniciaPantallas = ()   =>   {
    setCaptura(true);
    iniciaComponentes();
    setDlgPantallas(true);
    };
    
    const iniciaComponentes = ()   =>   {
    setPantallas({pantalla_id:null
       ,tipo:''
       ,tamano:''
    });
    formik.resetForm();
    };
    
    /**
    * Validación de las propiedades 
    *
    */
    const validate = () => {
    const errors = {};
     if (!Pantallas.tipo) {
    errors.txtTipoPantalla= t('Pantallas:required.tipoPantalla');
    }
    return errors;
    };
    
    const formik = useFormik({
    initialValues: {} ,
    //validate,
    onSubmit: () => {
    if(captura){
    agregaPantalla();
    } else{
    actualizaPantalla();
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
       <Button type="button" icon="pi pi-trash" className="p-button-rounded" onClick={()  =>  {eliminaPantalla(rowData);} }></Button>
       <Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()   =>   {seleccionaPantalla(rowData); } }></Button>
       </div>);
    }
    
    
    
    const rightFooter = (
    
    <div className="p-grid p-fluid">
       <div className="p-col-12">
          <div className="p-inputgroup"><Button tooltip={t('Pantallas:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgPantallas(false) }></Button>                 
             { !captura   &&  <Button tooltip={t('Pantallas:boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaPantalla }></Button>}                 
             { !captura   &&  <Button tooltip={t('Pantallas:boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
             { captura   &&  <Button tooltip={t('Pantallas:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                 
             
          </div>
       </div>
    </div>    
    );
    
    const dlgFooter = 
    <Toolbar right={rightFooter}></Toolbar>;                 
    
    
    
    
    
    return (
    
    <div>
       <h1>
          <Trans i18nKey="Pantallas:entidad"></Trans>
       </h1>
       <div className="p-grid p-fluid">
          <div className="p-col-12 p-md-12">
             <div className="p-inputgroup">
                <InputText placeholder={t('Pantallas:placeholder.tipoPantalla')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('Pantallas:boton.agregar')} icon="pi pi-plus" onClick={iniciaPantallas}></Button></div>
          </div>
       </div>
       <DataTable value={lstPantallas} paginator={true} rows={10} responsive={true}>
          <Column field="pantalla_id" header={t('Pantallas:label.idPantalla')} sortable={true}></Column>
          <Column field="tipo" header={t('Pantallas:label.tipoPantalla')} sortable={true}></Column>
          <Column field="tamano" header={t('Pantallas:label.tamPantalla')} sortable={true}></Column>
          <Column body={actionTemplate} header={t('Pantallas:rotulo.editar')}></Column>
       </DataTable>
       <Dialog header={t('Pantallas:rotulo.agregar')} footer={dlgFooter} visible={dlgPantallas} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgPantallas(false)} blockScroll={false}>
          { Pantallas  &&  
          <div>
             <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtTipoPantalla">
                      {t('Pantallas:label.tipoPantalla')}
                      </label>
                   {{captura} ? ( 
                   <InputText id="txtTipoPantalla" placeholder={t('Pantallas:placeholder.tipoPantalla')} value={Pantallas.tipo} className={formik.errors.txtTipoPantalla ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('tipo', e.target.value)}></InputText>    
                   ):(     <label id="txtTipoPantalla">pantallas.tipoPantalla</label>)}
                   
                   {formik.errors.txtTipoPantalla &&  <small id="txtTipoPantalla-help" className="p-invalid">
                      {formik.errors.txtTipoPantalla}
                      </small>}                 
                   
                </div>
                <div className="p-field p-col-12 p-md-12"><label htmlFor="txtTamPantalla">
                      {t('Pantallas:label.tamPantalla')}
                      </label>
                   {{captura} ? ( 
                   <InputText  id="txtTamPantalla" placeholer={t('Pantallas:placeholder.tamPantalla')} value={Pantallas.tamano} className={formik.errors.txtTamPantalla ? 'p-invalid':'p-inputtext'}  onChange={(e) =>   updateProperty('tamano', e.target.value)}></InputText>    
                   ):(     <label id="txtTamPantalla">pantallas.tamPantalla</label>)}
                   
                </div>
                    
             </div>
          </div>
          
          }
          
       </Dialog>
    </div>
    );
    
    
    
    }                
    export default Pantallas;                                        	
    
    
    