<template>
  <v-app id="inspire">
      
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
      fixed
      height="50px"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <!--<h1>Icono de usuarios y salir Ingeniería de sistemas</h1>-->
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-2"
              fab
              dark
              medium
              color="white"
              v-bind="attrs"
              v-on="on"
              icon
            >
              <v-icon dark large>
                account_circle
              </v-icon>
            </v-btn>
          </template>
          <v-card
            class="mx-auto"
            width="256"
            tile
          >
          <v-list>
            <v-list-item>
              <v-list-item-avatar >
                <v-img :src="datosPersona[0].foto"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{datosPersona[0].nombre}}
                  <v-spacer></v-spacer>
                  <div class="body-1">{{datosPersona[0].cargo}}</div>
                </v-list-item-title>
                <v-list-item-subtitle>{{datosPersona[0].correo}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon>mdi-menu-down</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list
            nav
            dense
          >
            <v-list-item-group
              v-model="selectedItem"
              color="primary"
            >
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <registrarUsuario />
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>task_alt</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Nuevo</v-list-item-title>

                  

                </v-list-item-content>
              </v-list-item>

            </v-list-item-group>
          </v-list>
          </v-card>
        </v-menu>
        <v-btn icon>
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
    >
      <v-list dense>
        <template>
          <v-list-item :to="{ name: 'Home'}">
            <v-list-item-icon>
              <v-icon>home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>
        </template>
        <template>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Accesos</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item :to="{ name: 'listarUsuario'}">
              <v-list-item-icon>
                <v-icon>people</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Usuarios</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: ''}">
              <v-list-item-icon>
                <v-icon>manage_accounts</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Roles</v-list-item-title>
            </v-list-item> 
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Almacen</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item :to="{ name: ''}">
              <v-list-item-icon>
                <v-icon>face</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sub-modulo2</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: ''}">
              <v-list-item-icon>
                <v-icon>manage_accounts</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sub-modulo2</v-list-item-title>
            </v-list-item> 
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Compras</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item :to="{ name: ''}">
              <v-list-item-icon>
                <v-icon>face</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sub-modulo2</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: ''}">
              <v-list-item-icon>
                <v-icon>manage_accounts</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sub-modulo2</v-list-item-title>
            </v-list-item> 
          </v-list-group>
        </template>
        <template>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Ventas</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item :to="{ name: ''}">
              <v-list-item-icon>
                <v-icon>face</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sub-modulo2</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: ''}">
              <v-list-item-icon>
                <v-icon>manage_accounts</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sub-modulo2</v-list-item-title>
            </v-list-item> 
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
    <!--Footer-->
    <v-footer
      color="primary"
      padless
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-col
          class="primary lighten py-4 text-center white--text"
          cols="top"
        >
          {{ new Date().getFullYear() }} — <strong>Footer</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import registrarUsuario from './components/RegistroUsuario'
export default {
  name: 'App',
  components: {registrarUsuario},
  data: () => ({
      selectedItem: 0,
      items: [
        { text: 'Agencia', icon: 'real_estate_agent' },
        { text: 'Nuevo rol', icon: 'group' },
        { text: 'Usuarios', icon: 'group_add' },
        { text: 'Equipos', icon: 'people_outline' },
      ],
      datosPersona: [{foto: 'https://cdn.vuetifyjs.com/images/john.png', nombre: 'Juan pablo', correo: 'saul23@gmail.com', cargo: 'Gerente'}],
      admins: [
        ['Management', 'help_outline'],
        ['Settings', 'help_outline'],
      ],
      cruds: [
        ['Create', 'help_outline'],
        ['Read', 'help_outline'],
        ['Update', 'update'],
        ['Delete', 'delete'],
      ],
      drawer: true,
      group: null,
      //dialog: false,
      
  }),
  watch: {
    group () {
      this.drawer = false
    },
  },
};
</script>