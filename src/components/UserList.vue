<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Organization Name</th>
                        <th>Phone Number For Home</th>
                        <th>Phone Number For Office</th>
                        <th>Position In Organization</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in Users" :key="user.key">
                        <td>{{ user.FirstName }}</td>
                        <td>{{ user.MiddleName }}</td>
                        <td>{{ user.LastName }}</td>
                        <td>{{ user.Email }}</td>
                        <td>{{ user.OrganizationName }}</td>
                        <td>{{ user.PhoneNumberForHome }}</td>
                        <td>{{ user.PhoneNumberForOffice }}</td>
                        <td>{{ user.PositionInOrganization }}</td>
                        <td>
                            <router-link :to="{name: 'edit', params: { id: user.key }}" class="btn btn-info">Update Contact
                            </router-link>
                            <button @click.prevent="deleteUser(user.key)" class="btn btn-danger" >Delete Contact</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import { db } from '../firebaseDb';
    
    export default {
        data() {
            return {
                Users: []
            }
        },
        created() {
            db.collection('phonebook').onSnapshot((snapshotChange) => {
                this.Users = [];
                snapshotChange.forEach((doc) => {
                    this.Users.push({
                        key: doc.id,
                        FirstName: doc.data().FirstName,
                        MiddleName: doc.data().MiddleName,
                        LastName: doc.data().LastName,
                        Email: doc.data().Email,
                        OrganizationName: doc.data().OrganizationName,
                        PhoneNumberForHome: doc.data().PhoneNumberForHome,
                        PhoneNumberForOffice: doc.data().PhoneNumberForOffice,
                        PositionInOrganization: doc.data().PositionInOrganization
                    })
                });
            })
        },
        methods: {
            deleteUser(id){
              if (window.confirm("Do you really want to delete contact?")) {
                db.collection("phonebook").doc(id).delete().then(() => {
                    console.log("Contact deleted!");
                })
                .catch((error) => {
                    console.error(error);
                })
              }
            }
        }
    }
</script>
<style>
    .btn-primary {
        margin-right: 12px;
    }
</style>