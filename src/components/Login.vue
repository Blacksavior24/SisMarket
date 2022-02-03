<template>
<v-app>
<v-main>
    <v-container>

        <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
        >
            <v-card>
                <v-card-title class="d-flex justify-center">
                <span class="text-h4">Iniciar Sesión</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                prepend-icon="email"
                                v-model="nombreUsuario"
                                label="Ingrese su correo"
                                type="text"
                                :rules="[rules.required]"
                                required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                :append-icon="mostrar1 ? 'visibility' : 'visibility_off'"
                                :type="mostrar1 ? 'text' : 'password'"
                                @click:append="mostrar1 = !mostrar1"
                                :rules="[rules.required]"
                                prepend-icon="lock"
                                v-model="password"
                                label="Contraseña"
                                required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <h3 class="text-left mt-3 red--text">
                        {{errorr}}
                    </h3>
                    <v-container class="d-flex justify-center">
                        <v-btn
                            text
                            :to="{name: 'recuperarPassword'}"
                        >
                            ¿Olvido su contraseña?
                        </v-btn>
                    </v-container>
                </v-card-text>
                <v-card-actions class="d-flex justify-center">
                    <v-btn
                        color="blue darken-1"
                        dark
                        @click="ingresar"
                    >
                        Ingresar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
    
</v-main>
</v-app>
</template>
<script>
import axios from 'axios';
export default {
    data:()=>({
        errorr: '',
        dialog: true,
        nombreUsuario: '',
        password: '',
        rules: {
           required: value => !!value || 'Campo requerido',
           min: v => v.length >= 6 || 'Minimo 6 caracteres',
        },
        mostrar1: false,
    }),
    methods:{
        ingresar(){
            let me=this;
            axios.post('api/v1/auth/login',{
                'email': me.nombreUsuario,
                'password': me.password,
            }).then(function(response){
                localStorage.setItem('dato', response.data)
                alert("Bienvenidos " + response.data.fullname)
                me.$router.push('/')
                me.nombreUsuario= ''
                me.password= ''
            }).catch(function(error){
                me.errorr = "Ingrese correctamente sus datos"
                console.log(error);
            });
        }
    },
    computed:{

    }
}
</script>
