<template>
    <header>
        <b-row xl="1"></b-row>
        <b-row align-h="between">
            <b-col xl="2">
                <a href="/"><img src="./../assets/logo.svg" alt="Accueil" /></a>
            </b-col>
            <b-col xl="3">
                <ul>
                    <li>Connection
                        <ul>
                            <li>Mon profil</li>
                            <li>Ma cave</li>
                            <li>Ma liste de souhait</li>
                            <li>Deconnection</li>
                        </ul>
                    </li>
                </ul>
            </b-col>
        </b-row>
    </header>
</template>
<script>
export default {
  name: 'header'
}
</script>
