# twitch-nextjs-bits

Hay que crear un archivo `.env.local`, crear una APP de Twitch y pegar este codigo en el archivo:

```
TWITCH_CLIENT_ID=<twitch-client-id>
NEXT_PUBLIC_TWITCH_CLIENT_ID=<twitch-client-id> # Este es para el front-end
```

## Observaciones

Esto es solo una demo, asi que:

- No hay que tomar de ejemplo, guardar el token en localStorage. **Nunca** hay que guardar tokens en localStorage.
- No se ve reflejado, pero programos SG, SSR, y IR.