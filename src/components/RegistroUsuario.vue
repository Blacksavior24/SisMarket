<template>
    <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    >
        <v-card>
            <v-card-title>
                <span class="text-h5">Registrarse</span>
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
                        prepend-icon="perm_identity"
                        v-model="nombresApellidos"
                        label="Nombres y Apellidos"
                        type="text"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                        prepend-icon="email"
                        v-model="correo"
                        label="Correo"
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
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
                <v-btn
                    color="blue darken-1"
                    dark
                    @click="Registrase"
                >
                    Registrarse
                </v-btn>
                <v-btn
                    text
                    :to="{name: 'login'}"
                >
                    Iniciar Sesión
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    data:()=>({
        dialog: true,
        nombreUsuario: '',
        nombresApellidos: '',
        correo: '',
        password: '',
    }),
    methods:{
        Registrarse(){

        }
    },
    computed:{
        
    }
}
</script>
