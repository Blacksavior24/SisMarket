<template>
    <v-layout align-start>
        <v-flex>
            <v-toolbar color="white">
                <v-toolbar-title>Usuario</v-toolbar-title>
                    <v-divider
                    class="mx-2"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    
                    <v-dialog v-model="dialog" max-width="500px">
                        <!--<v-btn slot="activator" color="primary" dark class="mb-2">Agregar nuevo</v-btn>-->
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
                                        <v-text-field v-model="editedItem.fullname" label="Nombres y Apellidos"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.user" label="Nombre Usuario"></v-text-field>
                                    </v-col>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.email" label="Correo"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-select v-model="editedItem.typeIDcard" :items="tDocumento" label="Tipo Documento">
                                        </v-select>
                                    </v-col>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.IDcard" label="Número Documento"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.password" label="Contraseña"></v-text-field>
                                    </v-col>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.phone" label="Teléfono"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-select v-model="editedItem.role" :items="rol" label="Rol">
                                        </v-select>
                                    </v-col>
                                    <v-col xs12 sm6 md4>
                                        <v-select v-model="editedItem.status" :items="estado" label="Estado">
                                        </v-select>
                                    </v-col>
                                </v-row>
                            </v-container>
                            </v-card-text>
                
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
            </v-data-table>
        </v-flex>
    </v-layout>
</template>
<script>
    import axios from 'axios';
    export default {
        data(){
            return {
                dialog: false,
                headers: [
                    { text: 'Usuario', align: 'left', value: 'user',sortable: false },
                    { text: 'Nombre Apellido', value: 'fullname' },
                    { text: 'Tipo Documento', value: 'typeIDcard',sortable: false },
                    { text: 'Num. Documento', value: 'IDcard',sortable: false },
                    { text: 'Correo', value: 'email',sortable: false },
                    { text: 'Rol', value: 'role' },
                    { text: 'Teléfono', value: 'phone',sortable: false },
                    { text: 'Password', value: 'password',sortable: false },
                    { text: 'Estado', value: 'status',sortable: false },
                    { text: 'Opciones', value: 'opciones', sortable: false }
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
                    }
            }
        },
        computed: {
            formTitle () {
            return this.editedIndex === -1 ? 'Agregar nuevo' : 'Editar usuario'
            }
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
                axios.get('http://localhost:3000/api/v1/users').then(function(response){
                    //console.log(response);
                    me.desserts=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            /*
            this.desserts = [
                {
                user: 'Elmer',
                fullname: 'Elmer Callo Mamani',
                typeIDcard: 'DNI',
                IDcard: '71878989',
                email: 'elmer@gmail.com',
                role:'administrador',
                phone:'989878787',
                password: '1234567',
                status: 'activo',
                },
                {
                user: 'Miguel',
                fullname: 'Miguel Mancha Calvo',
                typeIDcard: 'DNI',
                IDcard: '02323243',
                email: 'miguel@gmail.com',
                role:'almacenero',
                phone:'908765432',
                password: '3465435',
                status: 'inactivo',
                },
            ]*/
            },

            editItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
            },

            deleteItem (item) {
            const index = this.desserts.indexOf(item)
            confirm('¿Estas seguro de eliminar?') && this.desserts.splice(index, 1)
            },

            close () {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
            },

            save () {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
            }
        }        
    }
</script>
