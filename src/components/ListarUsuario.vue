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
                            Agregar Nuevo
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
                                        <v-text-field v-model="editedItem.nApellidos" label="Nombres y Apellidos"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.usuario" label="Nombre Usuario"></v-text-field>
                                    </v-col>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.correo" label="Correo"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-select v-model="editedItem.tDocumento" :items="tDocumento" label="Tipo Documento">
                                        </v-select>
                                    </v-col>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.nDocumento" label="Número Documento"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.password" label="Contraseña"></v-text-field>
                                    </v-col>
                                    <v-col xs12 sm6 md4>
                                        <v-text-field v-model="editedItem.telefono" label="Teléfono"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-container grid-list-md>
                                <v-row>
                                    <v-col xs12 sm6 md4>
                                        <v-select v-model="editedItem.rol" :items="rol" label="Rol">
                                        </v-select>
                                    </v-col>
                                    <v-col xs12 sm6 md4>
                                        <v-select v-model="editedItem.estado" :items="estado" label="Estado">
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
    export default {
        data(){
            return {
                dialog: false,
                headers: [
                    { text: 'Usuario', align: 'left', value: 'usuario',sortable: false },
                    { text: 'Nombre Apellido', value: 'nApellidos' },
                    { text: 'Tipo Documento', value: 'tDocumento',sortable: false },
                    { text: 'Num. Documento', value: 'nDocumento',sortable: false },
                    { text: 'Correo', value: 'correo',sortable: false },
                    { text: 'Rol', value: 'rol' },
                    { text: 'Teléfono', value: 'telefono',sortable: false },
                    { text: 'Password', value: 'password',sortable: false },
                    { text: 'Estado', value: 'estado',sortable: false },
                    { text: 'Opciones', value: 'opciones', sortable: false }
                ],
                search: '',
                desserts: [],
                editedIndex: -1,
                tDocumento: ['DNI', 'RUC', 'PASAPORTE'],
                rol: ['administrador', 'vendedor', 'almacenero', 'cajero'],
                estado: ['activo', 'inactivo'],
                editedItem: {
                    usuario: '',
                    nApellidos: '',
                    tDocumento: '',
                    nDocumento: '',
                    correo: '',
                    rol:'',
                    telefono:'',
                    password: '', 
                    estado: '',
                    },
                defaultItem: {
                    usuario: '',
                    nApellidos: '',
                    tDocumento: '',
                    nDocumento: '',
                    correo: '',
                    rol:'',
                    telefono:'',
                    password: '', 
                    estado: '',
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
            this.desserts = [
                {
                usuario: 'Elmer',
                nApellidos: 'Elmer Callo Mamani',
                tDocumento: 'DNI',
                nDocumento: '71878989',
                correo: 'elmer@gmail.com',
                rol:'administrador',
                telefono:'989878787',
                password: '1234567',
                estado: 'activo',
                },
                {
                usuario: 'Miguel',
                nApellidos: 'Miguel Mancha Calvo',
                tDocumento: 'DNI',
                nDocumento: '02323243',
                correo: 'miguel@gmail.com',
                rol:'almacenero',
                telefono:'908765432',
                password: '3465435',
                estado: 'inactivo',
                },
                {
                usuario: 'Marco',
                nApellidos: 'Elmer Lopez Javier',
                tDocumento: 'RUC',
                nDocumento: '02718283552',
                correo: 'marco@gmail.com',
                rol:'cajero',
                telefono:'980787666',
                password: '1546345',
                estado: 'activo',
                },
                {
                usuario: 'Carlos',
                nApellidos: 'Carlos Suvia Oblitas',
                tDocumento: 'DNI',
                nDocumento: '021898766',
                correo: 'carlos@gamil.com',
                rol:'vendedor',
                telefono:'999878787',
                password: '8796786',
                estado: 'inactivo',
                },
            ]
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
