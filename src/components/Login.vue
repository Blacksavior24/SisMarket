<template>
    <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    >
        <v-card>
            <v-card-title class="d-flex justify-center">
            <span class="text-h5">Iniciar Sesión</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                            prepend-icon="account_circle"
                            v-model="nombreUsuario"
                            label="Nombre usuario"
                            type="text"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                            prepend-icon="lock"
                            v-model="password"
                            label="Contraseña"
                            type="password"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-container class="d-flex justify-center">
                    <v-btn
                        text
                        :to="{name: 'cambiarPassword'}"
                    >
                        ¿Olvido su contraseña?
                    </v-btn>
                </v-container>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
                <v-btn
                    color="blue darken-1"
                    dark
                    @click="Ingresar"
                >
                    Ingresar
                </v-btn>
                <!--<v-btn
                    text
                    :to="{name: 'registroUsuario'}"
                >
                    Registrarse
                </v-btn>-->
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    data:()=>({
        dialog: true,
        nombreusuario: '',
        password: '',
       
    }),
    methods:{
        ingresar(){

        }
    },
    computed:{
        
    }
}
</script>
