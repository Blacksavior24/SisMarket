<template>
    <v-container fluid>
    <v-layout justify-center>
        <v-flex>
            <v-toolbar color="white" flat>
                <v-toolbar-title>Usuario</v-toolbar-title>
                    <v-divider
                    class="mx-2"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark class="mx-3" @click="imprimirListaUsuario">Imprimir</v-btn>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            v-bind="attrs"
                            v-on="on"
                            class="primary"
                            >
                            Nuevo
                            </v-btn>

                        </template>
                        <v-card>
                            <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>

                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="fullname" label="Nombres y Apellidos"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="user" label="Nombre Usuario"></v-text-field>
                                    </v-col>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="email" label="Correo"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-select v-model="typeIDcard" :items="tDocumento" label="Tipo Documento">
                                        </v-select>
                                    </v-col>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="IDcard" label="Número Documento"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="password" label="Contraseña" type="password"></v-text-field>
                                    </v-col>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="phone" label="Teléfono"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-select v-model="role" :items="rol" label="Rol">
                                        </v-select>
                                    </v-col>
                                    <v-col xs12 sm6 md4>
                                        <v-select v-model="status" :items="estado" label="Estado">
                                        </v-select>
                                    </v-col>
                                </v-row>
                            </v-container>
                            </v-card-text>
                            <p class="ml-7 red--text">{{result}}</p>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click.native="close">Cancelar</v-btn>
                            <v-btn color="primary" @click.native="save">Guardar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
            </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
                class="elevation-1"
            >
                <template v-slot:[`item.opciones`]="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                        small
                        @click="deleteItem(item)"
                    >
                        delete
                    </v-icon>
                </template>
                <template v-slot:[`item.status`]="{ item }">
                    <div v-if="item.status == 'activo'">
                        <span class="blue--text">Activo</span>
                    </div>
                    <div v-else>
                        <span class="red--text">Inactivo</span>
                    </div>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
    </v-container>
</template>
<script>
    import axios from 'axios';
    import jsPDF from 'jspdf'; 
    export default {
        data(){
            return {
                user: '',
                fullname: '',
                typeIDcard: '',
                IDcard: '',
                email: '',
                role:'',
                phone:'',
                password: '',
                status: '',

                dialog: false,
                headers: [
                    { text: 'Usuario', align: 'left', value: 'user',sortable: false },
                    { text: 'Nombre Apellido', align: 'left', value: 'fullname' },
                    { text: 'Tipo Documento', align: 'center', value: 'typeIDcard',sortable: false },
                    { text: 'Num. Documento', align: 'center', value: 'IDcard',sortable: false },
                    { text: 'Correo', align: 'center', value: 'email',sortable: false },
                    { text: 'Rol', align: 'center', value: 'role',sortable: false },
                    { text: 'Teléfono', align: 'center', value: 'phone',sortable: false },
                    { text: 'Password', align: 'center', value: 'password',sortable: false },
                    { text: 'Estado', align: 'center', value: 'status',sortable: false },
                    { text: 'Opciones', align: 'center', value: 'opciones', sortable: false }
                ],
                search: '',
                
                desserts: [],
                editedIndex: -1,
                tDocumento: ['DNI', 'RUC', 'PASAPORTE'],
                rol: ['administrador', 'vendedor', 'almacenero', 'cajero'],
                estado: ['activo', 'inactivo'],
                editedItem: {
                    user: '',
                    fullname: '',
                    typeIDcard: '',
                    IDcard: '',
                    email: '',
                    role:'',
                    phone:'',
                    password: '',
                    status: '',
                    },
                defaultItem: {
                    user: '',
                    fullname: '',
                    typeIDcard: '',
                    IDcard: '',
                    email: '',
                    role:'',
                    phone:'',
                    password: '',
                    status: '',
                    },
                result: "",
                dataImprimir: [],
            }
        },
        computed: {
            formTitle () {
            return this.editedIndex === -1 ? 'Agregar nuevo' : 'Editar usuario'
            },
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () {
            this.initialize()
        },
        methods:{
            estadoActualizar(){

            },
            initialize () {
                let me=this;
                axios.get('api/v1/users').then(function(response){
                    me.desserts=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            },

            editItem (item) {
            this.dialog = true
            this.id = item.id;
            this.user = item.user;
            this.fullname = item.fullname;
            this.typeIDcard = item.typeIDcard;
            this.IDcard = item.IDcard;
            this.email = item.email;
            this.role = item.role;
            this.phone = item.phone;
            this.password = item.password;
            this.status = item.status;
            this.editedIndex = 1;
            },

            deleteItem (item) {
                let me = this;
                axios.delete('api/v1/users/'+item.id).then(function(response){
                    me.initialize();
                    alert("Eliminado correctamente")
                }).catch(function(error){
                    console.log(error)
                })
            },

            close () {
            this.result = ""
            this.dialog = false
            this.limpiar();
            },

            limpiar(){
                this.user = "";
                this.fullname = "";
                this.typeIDcard = "";
                this.IDcard = "";
                this.email = "";
                this.role = "";
                this.phone = "";
                this.password = "";
                this.status = "";
                this.editedIndex = -1;
            },

            save () {
                if (this.editedIndex > -1) {
                    this.validarDatos()
                    if(this.result == ""){
                        let me = this;
                        axios.patch('api/v1/users/'+parseInt(this.id),{
                            'user': this.user,
                            'fullname': this.fullname,
                            'typeIDcard': this.typeIDcard,
                            'IDcard': this.IDcard,
                            'email': this.email,
                            'role': this.role,
                            'phone': this.phone,
                            'password': this.password,
                            'status': this.status
                        }).then(function(response){
                            me.close();
                            me.initialize();
                            me.limpiar();
                        }).catch(function(error){
                            console.log(error)
                        })
                    }
    
                } else {
                    this.validarDatos()
                    if(this.result == ""){
                        let me = this;
                        axios.post('api/v1/users/',{
                            'user': this.user,
                            'fullname': this.fullname,
                            'typeIDcard': this.typeIDcard,
                            'IDcard': this.IDcard,
                            'email': this.email,
                            'role': this.role,
                            'phone': this.phone,
                            'password': this.password,
                            'status': this.status,
                        }).then(function(response){
                            me.close();
                            me.initialize();
                            me.limpiar();
                        }).catch(function(error){
                            console.log(error)
                        })

                    }
                }
            },
            validarDatos(){
                if(this.user != "" && this.fullname!= "" && this.typeIDcard!= "" && this.IDcard!= "" && this.email!= "" && this.role!= "" && this.phone!= "" && this.password!= "" && this.status!= ""){
                    if(this.password.length < 8){
                        this.result = "La contraseña necesita mínimo 8 caracteres"
                    }else{
                        this.result = ""
                    }
                }else{
                    this.result = "Verifique si todos sus datos estan ingresados"
                }
            },
            imprimirListaUsuario(){
                this.actualizarTabla();
                require('jspdf-autotable');
                var opciones = {
                    orientation: 'p',
                    unit: 'mm',
                    format: [240, 300]
                };
            
                var doc = new jsPDF(opciones);
                doc.setFontSize(20);
                doc.text(15, 25, 'Usuarios')
                var columns = ["Nombre usuario", "Nombre Completo", "Estado"];
                doc.autoTable(columns,this.dataImprimir,
                    { margin:{ top: 35 }}
                );
                doc.save('ListaUsuarios.pdf');
            },
            actualizarTabla(){
                for(var i=0; i<this.desserts.length; i++){
                    this.dataImprimir.push([this.desserts[i].user, this.desserts[i].fullname, this.desserts[i].status])
                }
            },
        }
    }
</script>
