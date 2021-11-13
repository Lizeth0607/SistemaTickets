import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import 'moment-timezone';
import RegistrosService from '../service/RegistrosService';
import { useTranslation , Trans} from 'react-i18next';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { useFormik } from 'formik';
import './Password.css';
import App from '../App';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
export const Login = () => {
    const [value1, setValue1] = useState('');
    const routes = [
        {path:'/Registros', component: Registros, meta: { breadcrumb: [{ parent: 'Operación', label: 'Registro' }] }},

    ]
    const  [mensaje, setMensaje] = useState({
        title: '',
        text: '',
        icon: '',
        confirmButtonText: 'Aceptar',
        timer: '3000'
        });
        
        
        const [lstRegistros, setLstRegistros] = useState([]);
        const [errores, setErrores] = useState([]);
        const [dlgRegistros, setDlgRegistros] = useState(false);
        const [Registros, setRegistros] = useState({id:null
        ,nombre:''
        , password:''
        });
        
        const [txtCriterio, setTxtCriterio] = useState('');
        const { t } = useTranslation(['translation','Registros']);
        const [captura, setCaptura] = useState(false);
        const registrosService = new RegistrosService(); //MODIFICAR SERVICES
        
        const registrosSuccess = (severidad,cabecero,detalle)   =>   {
        let mensajeCopy = Object.assign({}, mensaje);
        mensajeCopy['title'] = cabecero;
        mensajeCopy['text'] = detalle;
        mensajeCopy['icon'] = severidad;
        setMensaje(mensajeCopy);
        Swal.fire(mensajeCopy);
        }
        
        
        const agregaRegistro = ()   =>   {
        registrosService.agregaRegistro (Registros).
        then(data => {setRegistros(data);
        registrosSuccess('success',t('Registros:cabecero.exito'),t('Registros:mensaje.agregar'));
        setDlgRegistros(false);
        });
        };
        
        const updateProperty = (propiedad, valor)   =>  {
        let registroCopy = Object.assign({}, Registros);
        registroCopy[propiedad] = valor;
        setRegistros(registroCopy);
        };
        
        const iniciaRegistros = ()   =>   {
        setCaptura(true);
        iniciaComponentes();
        setDlgRegistros(true);
        };
        
        const iniciaComponentes = ()   =>   {
        setRegistros({ID:null
           ,nombre:''
           ,password:''
        });
        formik.resetForm();
        };
        
        const validate = () => {
        const errors = {};
         if (!Registros.nombre||!Registros.password) {
           errors.txtNombre= t('Registros:required.nombre');
           errors.txtPassword= t('Registros:required.password');
        }
        return errors;
        };
        
        const formik = useFormik({
        initialValues: {} ,
        validate,
        onSubmit: () => {
        if(captura){
           agregaRegistro();
        } 
        },
        });
    const rightFooter = (
            <div className="p-grid p-fluid">
               <div className="p-col-12">
                  <div className="p-inputgroup"><Button tooltip={t('Registros:boton.cancelar')} icon="pi pi-ban" className="p-button-rounded" onClick={()   =>   setDlgRegistros(false) }></Button>                 
                    { captura   &&  <Button tooltip={t('Registros:boton.agregar')} icon="pi pi-check" className="p-button-rounded" onClick={formik.handleSubmit}></Button>}                  
                  </div>
               </div>
            </div>    
        );
    const dlgFooter = 
    <Toolbar right={rightFooter}></Toolbar>;  

    return (
        <div className="login-body">
            <div className="login-wrapper">
                <div className="login-panel">
                <img src="https://img.icons8.com/color/100/000000/user-location.png"/>
                    <div className="login-form">
                        <h2>Inicia sesión para ingresar </h2>
                        <p>¿No tienes una cuenta? <a onClick={iniciaRegistros}>Regístrate aquí.</a></p>

                        
                        <Dialog header={t('Registros:rotulo.agregar')} footer={dlgFooter} visible={dlgRegistros} modal={true} style={{ width: '50vw' }} onHide={(e)   =>   setDlgRegistros(false)} blockScroll={false}>
                            { Registros  &&  
                            <div>
                                <div className="p-fluid p-formgrid p-grid">
                                    <div className="p-field p-col-12 p-md-12"><label htmlFor="txtNombre">
                                        {t('Registros:label.nombre')}
                                        </label>
                                    {{captura} ? ( 
                                    <InputText id="txtNombre" placeholder={t('Registros:placeholder.nombre')} value={Registros.nombre} className={formik.errors.txtNombre ? 'p-invalid':'p-inputtext'} maxLength={45} onChange={(e) =>   updateProperty('nombre', e.target.value)}></InputText>    
                                    ):(     <label id="txtNombre">registros.nombre</label>)}
                                    
                                    {formik.errors.txtNombre  &&  <small id="txtNombre-help" className="p-invalid">
                                        {formik.errors.txtNombre}
                                        </small>}                 
                                    </div>  
                                    <div className="p-field p-col-12 p-md-12"><label htmlFor="txtPassword">
                                        {t('Registros:label.password')}
                                        </label>
                                    {{captura} ? ( 
                                        <Password id="txtPassword" placeholder={t('Registros:placeholder.nombre')} value={Registros.password} className={formik.errors.txtPassword ? 'p-invalid': 'p-inputtext'} onChange={(e) =>   updateProperty('password', e.target.value)} toggleMask />
                                        ):(     <label id="txtPassword">registros.password</label>)}
                                    
                                    {formik.errors.txtPassword  &&  <small id="txtPassword-help" className="p-invalid">
                                        {formik.errors.txtPassword}
                                        </small>}                 
                                    </div>  
                                </div>
                            </div>
                            }
                        </Dialog>









                        <InputText placeholder="Email" />
                        <Password placeholder="Password" value={value1} onChange={(e) => setValue1(e.target.value)} className="p-invalid" feedback={false} />
                    </div>
                    <div>
                         <Link to="/App">
                           <Button  label="CONTINUAR" type="button"></Button>
                        </Link>

                    </div>

                    <p>Adler Pelzer</p>
                </div>
                <div className="login-image">
                    <div className="login-image-content">
                        <h1>Acceso a </h1>
                        <h1>tu cuenta</h1>
                        <h1>HPP Systems (Sistema de tickets)</h1>
                        
                    </div>
                    <div className="image-footer">
                        <p>Sistema enfocado en el control de soporte técnico en el área de IT.</p>
                        <div className="icons">
                            <i className="pi pi-ticket"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


