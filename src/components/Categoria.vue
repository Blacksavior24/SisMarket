<template>
    <v-layout align-start>
        <v-flex>
            <v-toolbar flat color="white">
                <v-toolbar-title>Categorías</v-toolbar-title>
                <v-divider
                class="mx-2"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color="primary" dark class="mb-2">Agregar nuevo</v-btn>
                <v-card>
                    <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
        
                    <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.producto" label="Productos"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.cantidad" label="Cantidad"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.descripcion" label="Descripcion"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.codigo" label="Codigo"></v-text-field>
                        </v-flex>
                        </v-layout>
                    </v-container>
                    </v-card-text>
        
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save">Guardar</v-btn>
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
                <template slot="items" slot-scope="props">
                <td>{{ props.item.producto }}</td>
                <td class="text-xs-right">{{ props.item.cantidad }}</td>
                <td class="text-xs-right">{{ props.item.descripcion }}</td>
                <td class="text-xs-right">{{ props.item.codigo }}</td>
                <td class="justify-center layout px-0">
                    <v-icon
                    small
                    class="mr-2"
                    @click="editItem(props.item)"
                    >
                    edit
                    </v-icon>
                    <v-icon
                    small
                    @click="deleteItem(props.item)"
                    >
                    delete
                    </v-icon>
                </td>
                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="initialize">Reset</v-btn>
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
                {
                    text: 'Productos',
                    align: 'left',
                    sortable: false,
                    value: 'producto'
                },
                { text: 'Cantidad', value: 'cantidad' },
                { text: 'Descripcion', value: 'descripcion' },
                { text: 'Codigo', value: 'codigo' },
                { text: 'Opciones', value: 'opciones', sortable: false }
                ],
                search: '',
                desserts: [],
                editedIndex: -1,
                editedItem: {
                producto: '',
                cantidad: 0,
                descripcion: '',
                codigo: 0
                },
                defaultItem: {
                producto: '',
                cantidad: 0,
                descripcion: '',
                codigo: 0
                }
            }
        },
        computed: {
            formTitle () {
            return this.editedIndex === -1 ? 'Agregar nuevo' : 'Editar item'
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
            initialize () {
            this.desserts = [
                {
                producto: 'Yogurt',
                cantidad: 159,
                descripcion: 'descripcion Yogurt',
                codigo: 2434
                },
                {
                producto: 'Helados',
                cantidad: 200,
                descripcion: 'descripcion Yogurt',
                codigo: 6778
                },
                {
                producto: 'Panes',
                cantidad: 159,
                descripcion: 'descripcion panes',
                codigo: 2478
                },
                {
                producto: 'Bebidas',
                cantidad: 159,
                descripcion: 'descripcion bebidas',
                codigo: 2478
                },
                {
                producto: 'Licores',
                cantidad: 154,
                descripcion: 'descripcion Licores',
                codigo: 2489
                },
                {
                producto: 'Chocolates',
                cantidad: 159,
                descripcion: 'descripcion Chocolates',
                codigo: 2400
                },
                {
                producto: 'Frozen Yogurt',
                cantidad: 159,
                descripcion: 6.0,
                codigo: 2489
                },
                {
                producto: 'Torta',
                cantidad: 159,
                descripcion: 'descripcion tortas',
                codigo: 2467
                },
                {
                producto: 'Caramelos',
                cantidad: 159,
                descripcion: 'descripcion caramelos',
                codigo: 2444
                },
                {
                producto: 'Galletas',
                cantidad: 159,
                descripcion: 'descripcion galletas',
                codigo: 2434
                }
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
