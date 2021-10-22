import React, {  useEffect, useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import { ToggleButton } from 'primereact/togglebutton';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import Moment from 'react-moment';
import 'moment-timezone';
import { classNames } from 'primereact/utils';     
import TblSentidosSentenciasService from '../service/TblSentidosSentenciasService';

import { useTranslation , Trans} from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import "./FormDemo.css";



const TblSentidosSentencias = ()   =>   {
const  [mensaje, setMensaje] = useState({
title: '',
text: '',
icon: '',
confirmButtonText: 'Aceptar',
timer: '3000'
});

const [showMessage, setShowMessage] = useState(false);
const [checked2, setChecked2] = useState(false);

const [lstTblSentidosSentencias, setLstTblSentidosSentencias] = useState([]);
const [errores, setErrores] = useState([]);
const [dlgTblSentidosSentencias, setDlgTblSentidosSentencias] = useState(false);
const [tblSentidosSentencias, setTblSentidosSentencias] = useState({});

const [txtCriterio, setTxtCriterio] = useState('');
const { t } = useTranslation(['translation','tblSentidosSentencias']);
const [captura, setCaptura] = useState(false);
const tblSentidosSentenciasService = new TblSentidosSentenciasService();




const tblSentidosSentenciasSuccess = (severidad,cabecero,detalle)   =>   {
let mensajeCopy = Object.assign({}, mensaje);
mensajeCopy['title'] = cabecero;
mensajeCopy['text'] = detalle;
mensajeCopy['icon'] = severidad;
setMensaje(mensajeCopy);
}

const obtenerTblSentidosSentencias = ()   =>   {
tblSentidosSentenciasService.obtenerTblSentidosSentencias (txtCriterio).then(data => setLstTblSentidosSentencias(data));
};

const seleccionaTblSentidosSentencias = (pTblSentidosSentencias)   =>   {
setCaptura(false);
setTblSentidosSentencias(pTblSentidosSentencias);
tblSentidosSentenciasService.seleccionaTblSentidosSentencias (pTblSentidosSentencias).then(data => { 

setValue( 'cveSentidoSentencia' , data.cveSentidoSentencia);

setValue( 'descSentidoSentencia' , data.descSentidoSentencia);

setValue( 'activo' , data.activo);

setValue( 'fechaRegistro' , data.fechaRegistro);

setValue( 'fechaActualizacion' , data.fechaActualizacion);
});
setDlgTblSentidosSentencias(true);
};

useEffect(()   =>   {
obtenerTblSentidosSentencias();
},  [txtCriterio]);


const agregaTblSentidosSentencias = (pTblSentidosSentencias)   =>   {
tblSentidosSentenciasService.agregaTblSentidosSentencias (pTblSentidosSentencias).
then(data => {setTblSentidosSentencias(data);
setDlgTblSentidosSentencias(false);
obtenerTblSentidosSentencias ();
});
};

const eliminaTblSentidosSentencias = ()   =>   {
tblSentidosSentenciasService.eliminaTblSentidosSentencias (tblSentidosSentencias);
};

const actualizaTblSentidosSentencias = (pTblSentidosSentencias)   =>   {
tblSentidosSentenciasService.actualizaTblSentidosSentencias (pTblSentidosSentencias).
then(data => { setDlgTblSentidosSentencias(false); obtenerTblSentidosSentencias();});
};

const updateProperty = (propiedad, valor)   =>  {
let tblSentidosSentenciasCopy = Object.assign({}, tblSentidosSentencias);
tblSentidosSentenciasCopy[propiedad] = valor;
setTblSentidosSentencias(tblSentidosSentenciasCopy);
};

const iniciaTblSentidosSentencias = ()   =>   {
setCaptura(true);
reset();
setDlgTblSentidosSentencias(true);
};

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
<div><Button type="button" icon="pi pi-pencil" className="p-button-rounded" onClick={()  =>  {seleccionaTblSentidosSentencias(rowData);} }></Button><Button type="button" icon="pi pi-trash" className="p-button-rounded" onClick={()   =>   {seleccionaTblSentidosSentencias(rowData); } }></Button></div>);
}



const rightFooter = (

<div className="p-grid p-fluid">
   <div className="p-col-12">
      <div className="p-inputgroup"><Button tooltip={t('boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   {reset(); setDlgTblSentidosSentencias(false); }}></Button>                 
         { !captura   &&  <Button tooltip={t('boton.eliminar')} icon="pi pi-times" className="p-button-rounded" onClick={eliminaTblSentidosSentencias }></Button>}                 
         { !captura   &&  <Button tooltip={t('boton.actualizar')} icon="pi pi-undo" className="p-button-rounded" type="submit"></Button>}                 
         { captura   &&  <Button tooltip={t('boton.agregar')} icon="pi pi-check" className="p-button-rounded" type="submit"></Button>}                 
         
      </div>
   </div>
</div>    
);

const dlgFooter = 
<Toolbar right={rightFooter}></Toolbar>;                 


const { control, formState: { errors }, handleSubmit, reset, clearErrors, setValue,  } = useForm();
const getFormErrorMessage = (name)  => {
return errors[name]   &&  <small className="p-error">{errors[name].message}</small>
};        

const onSubmit = (data) => {
let tblSentidosSentenciasCopy = Object.assign({}, data);

if(captura){
agregaTblSentidosSentencias(tblSentidosSentenciasCopy);
} else {
actualizaTblSentidosSentencias(tblSentidosSentenciasCopy);
}
reset();
};    

const dialogFooter = 
<div className="p-d-flex p-jc-center">
   <Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} />
   
</div>;
return (

<div>
   <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-12">
         <div className="p-inputgroup">
            <InputText placeholder={t('placeholder.criterio')} value={txtCriterio} onChange={(e)   =>   setTxtCriterio(e.target.value)}></InputText><Button tooltip={t('boton.agregar')} icon="pi pi-plus-circle" onClick={iniciaTblSentidosSentencias}></Button></div>
      </div>
   </div>
   <DataTable value={lstTblSentidosSentencias} paginator={true} rows={10} responsive={true}>
      <Column field="descSentidoSentencia" header={t('tblSentidosSentencias:label.descSentidoSentencia')} sortable={true}></Column>
      <Column field="activo" header={t('tblSentidosSentencias:label.activo')} sortable={true}></Column>
      <Column field="fechaRegistro" header={t('tblSentidosSentencias:label.fechaRegistro')} sortable={true}></Column>
      <Column field="fechaActualizacion" header={t('tblSentidosSentencias:label.fechaActualizacion')} sortable={true}></Column>
      <Column body={actionTemplate} header={t('rotulo.editar')}></Column>
   </DataTable>
   <Dialog header={t('tblSentidosSentencias:rotulo.agregar')} visible={dlgTblSentidosSentencias} modal={true} onHide={(e)   =>  {clearErrors(); setDlgTblSentidosSentencias(false);}} blockScroll={false}>
      { tblSentidosSentencias  &&  
      <div className="p-d-flex">
         <div className="card">
            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid p-formgrid p-grid">
               <div className="p-field p-col-12 p-md-6"><span className="p-float-label">
                     <Controller name="descSentidoSentencia" control={control} rules={{required:t('tblSentidosSentencias:required.descSentidoSentencia')}} render={({ field, fieldState}) => ( <InputText id={field.descSentidoSentencia} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />                                                                                        )}></Controller><label htmlFor="descSentidoSentencia" className={classNames({ 'p-error': errors.descSentidoSentencia })}>
                        {t('tblSentidosSentencias:label.descSentidoSentencia')}
                        </label></span>
                  {getFormErrorMessage('descSentidoSentencia')}
                  
               </div>
               <div className="p-field p-col-12 p-md-6"><span className="p-float-label">
                     <Controller name="activo" control={control} render={({ field, fieldState}) => ( <ToggleButton id={field.activo} {...field} onChange={(e) => field.onChange(e.checked)}  onLabel={t('rotulo.si')} offLabel={t('rotulo.no')} onIcon="pi pi-check" offIcon="pi pi-times" />                                                                        )}></Controller><label htmlFor="activo" className={classNames({ 'p-error': errors.activo })}>
                        {t('tblSentidosSentencias:label.activo')}
                        </label></span>
                  {getFormErrorMessage('activo')}
                  
               </div>
               <div className="p-field p-col-12 p-md-6"><span className="p-float-label">
                     <Controller name="activo1" control={control} render={({ field, fieldState}) => ( <ToggleButton checked={checked2} onChange={(e) => setChecked2(e.value)} onLabel={t('rotulo.si')} offLabel={t('rotulo.no')} onIcon="pi pi-check" offIcon="pi pi-times"/>                                                                        )}></Controller><label htmlFor="activo1" className={classNames({ 'p-error': errors.activo })}>
                        {t('tblSentidosSentencias:label.activo')}
                        </label></span>
                  {getFormErrorMessage('activo')}
                  
               </div>
               <div className="p-field  p-col-12 p-md-12">
                  {dlgFooter}
                  
               </div>
            </form>
         </div>
      </div>
      
      
      }
      
   </Dialog>
   <Dialog showHeader={false} visible={showMessage} modal={true} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter}>
      <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
         <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }} />
         
         <h5>Registro satisfactorio</h5>
         <p>
            Es correcto en registro <b>Valor</b></p>
      </div>
   </Dialog>
</div>
);



}                
export default TblSentidosSentencias;