<template>
  <v-container fluid>
      <v-layout justify-center>
          <v-flex>
              <v-toolbar flat>
                  <v-toolbar-title>Categoria</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Agregar</v-btn>
                      </template>
                      <v-card>
                          <v-card-title>
                              <span class="text-h5">{{ formTitle }}</span>
                          </v-card-title>
                          <v-container grid-list-md>
                              <v-layout wrap>
                                  <v-flex xs12 sm12 md12>
                                      <v-text-field v-model="nombre_Categoria" label="Nombre"></v-text-field>
                                  </v-flex>
                                  <v-flex xs12 sm12 md12>
                                      <v-text-field v-model="nombre_Descripcion" label="Descripcion"></v-text-field>
                                  </v-flex>
                              </v-layout>
                          </v-container>
                          <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                              <v-btn color="blue darken-1" text @click="guardar">Guardar</v-btn>
                          </v-card-actions>
                      </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                      <v-card>
                          <v-card-title class="text-h5">¿Desea eliminar categoria?</v-card-title>
                          <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                              <v-spacer></v-spacer>
                          </v-card-actions>
                      </v-card>
                  </v-dialog>
              </v-toolbar>
              <v-data-table 
                :headers="listaCategoria" 
                :items="categoria" 
                :search="search" 
                class="elevation-1"
              >
                  <template v-slot:[`item.actions`]="{ item }">
                      <td>
                          <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                          <v-icon small class="mr-2" @click="deleteItem(item)">published_with_changes</v-icon>
                          <v-icon small>business</v-icon>
                      </td>
                  </template>
                  <template v-slot:no-data>
                      <v-btn color="primary" @click="listar">Reset</v-btn>
                  </template>
              </v-data-table>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
    import axios from 'axios';
    export default {
        data:()=>({
            search: '',
            dialog: false,
            dialogDelete: false,
            /*Listar Categoria */
            listaCategoria: [
                { text: 'Opciones', value: 'actions', sortable: false },
                { text: 'Nombre', value: 'user' },
                { text: 'Descripcion', value: '', sortable: false  },
                { text: 'Estado', value: '', sortable: false  }
            ],
            categoria:[],
            nombre_Categoria:'',
            nombre_Descripcion:'',
            /*Validar Datos */
            valida: 0,
            valida_Mensaje:[],
            /*otros*/
            desserts: [],
            editedIndex: -1,
            
        }),
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nuevo categoria' : 'Actualizar categoria'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
            dialogDelete (val) {
                val || this.closeDelete()
            },
        },
        created () {
            //this.initialize();
            this.listar();
        },

        methods:{
            fechaEstan(){
                return {
                    fechaIn: fechaInicio.toISOString()
                }
            },
            listar(){
                let me=this;
                axios.get('http://localhost:3000/api/v1/users').then(function(response){
                    console.log(response);
                    me.categoria=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            },

            editItem (item) {
                //Varriales para editar
                this.editedIndex=1;
                this.dialog = true
            },

            deleteItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm () {
                this.desserts.splice(this.editedIndex, 1)
                this.closeDelete()
            },

            close () {
                this.dialog = false;
                this.limpiar();
            },

            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
            },
            limpiar(){
                this.nombre_Categoria="";
                this.nombre_Descripcion="";

                //Val limpiar
                this.valida="";
                //val editar
                this.editedIndex=-1;
            },
            guardar () {
                if (this.validar()){
                    return;
                }
                if (this.editedIndex > -1) {
                    //Codigo para editar
                } else {
                    //Codigo para guardar
                    let me=this;
                    axios.post('',{
                        //Valores post,
                        
                    }).then(function(response){
                        me.listar();
                        me.close();
                        me.limpiar();
                    }).catch(function(error){
                        console.log(error)
                    });
                }
            },
            validar(){
                this.valida=0;
                this.valida_Mensaje=[];

                //Validaciones requeridas
                //
                //
                if (this.valida_Mensaje.length){
                    this.valida=1;
                }
                return this.valida;
            }

        }
    }
</script>