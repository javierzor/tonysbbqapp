use App\Mail\TonysRespuestasDeFormulario;
use App\tonysadmindirecciones;
use App\tonysadminfase;
use App\tonysanuncios;
use App\tonysarchivosusuarios;
use App\tonysbarra;
use App\tonysconversaciones;
use App\tonysdirecciones;
use App\tonysdireccionretiro;
use App\tonysformularios;
use App\tonysformulariosusuarios;
use App\tonysmensajes;
use App\tonysmovimientos;
use App\tonyspreguntascuestionarios;
use App\tonysrespuestaspreguntascuestionarios;
use App\tonysusers;


            //tonys INICIO
            //tonys INICIO
            case 'tonysappinicio':
                $username = $data->username;
                $password = $data->password;
                $incorrectas = 'credencialesincorrectas';
                $respuestadelaconsulta = tonysusers::where('username', $username)->where('password', $password)->first();
                if ($respuestadelaconsulta) {
                    if ($respuestadelaconsulta->id > 0) {
                        return ($respuestadelaconsulta);
                    } else {
                        return json_encode($incorrectas);
                    }
                } else {
                    return json_encode($incorrectas);
                }

                break;

            case 'tonyscreateuser':
                $username = $data->username;
                $password = $data->password;
                $create_date = $data->create_date;
                $tipo_cuenta = $data->tipo_cuenta;
                $email = $data->email;
                $name = $data->name;
                $lastname = $data->lastname;
                $paisnombre = $data->paisnombre;
                $paisID = $data->paisID;
                $referidor = $data->referidor;
                $cuatrodigitos = substr(str_shuffle("123456789"), 0, 4);
                $palabra_alante = 'TBBQ';
                $letraaleatoria = substr(str_shuffle("QWERTYUIOPASDFGHJKLÑZXCVBM"), 0, 1);
                $id_publico = $palabra_alante . $letraaleatoria . $cuatrodigitos;
                $seraqueexiste = tonysusers::where('id_publico', $id_publico)->get();
                if (count($seraqueexiste) > 0) {
                    $letraaleatoria = substr(str_shuffle("QWERTYUIOPASDFGHJKLÑZXCVBM"), 0, 1);
                    $id_publico = $palabra_alante . $letraaleatoria . $cuatrodigitos;
                }

                return tonysusers::create([
                    'username' => $username,
                    'password' => $password,
                    'create_date' => $create_date,
                    'tipo_cuenta' => $tipo_cuenta,
                    'name' => $name,
                    'lastname' => $lastname,
                    'paisnombre' => $paisnombre,
                    'paisID' => $paisID,
                    'email' => $email,
                    'id_publico' => $id_publico,
                    'referidor' => $referidor,
                ]);
                break;

            case 'tonysupdateuser':
                $uid = $data->uid;
                $name = $data->name;
                $lastname = $data->lastName;
                $paisnombre = $data->paisnombre;
                $paisID = $data->countryId;
                $descripcion = $data->description;
                $genero = $data->genderId;
                $profile_url_img = $data->profile_url_img;
                $password = $data->nuevopassword;
                $contadordeupdates = 0;

                if ($name) {

                    tonysusers::where('id', $uid)
                        ->update([
                            'name' => $name,
                        ]);
                    $contadordeupdates = $contadordeupdates + 1;
                }
                if ($lastname) {
                    tonysusers::where('id', $uid)
                        ->update([
                            'lastname' => $lastname,
                        ]);
                    $contadordeupdates = $contadordeupdates + 1;
                }
                if ($paisnombre) {
                    tonysusers::where('id', $uid)
                        ->update([
                            'paisnombre' => $paisnombre,
                        ]);
                    $contadordeupdates = $contadordeupdates + 1;
                }
                if ($paisID) {
                    tonysusers::where('id', $uid)
                        ->update([
                            'paisID' => $paisID,
                        ]);
                    $contadordeupdates = $contadordeupdates + 1;
                }
                if ($descripcion) {
                    tonysusers::where('id', $uid)
                        ->update([
                            'descripcion' => $descripcion,
                        ]);
                    $contadordeupdates = $contadordeupdates + 1;
                }
                if ($genero) {
                    tonysusers::where('id', $uid)
                        ->update([
                            'genero' => $genero,
                        ]);
                    $contadordeupdates = $contadordeupdates + 1;
                }
                if ($profile_url_img) {
                    tonysusers::where('id', $uid)
                        ->update([
                            'profile_url_img' => $profile_url_img,
                        ]);
                    $contadordeupdates = $contadordeupdates + 1;
                }
                if ($password) {
                    tonysusers::where('id', $uid)
                        ->update([
                            'password' => $password,
                        ]);
                    $contadordeupdates = $contadordeupdates + 1;
                }

                if ($contadordeupdates > 0) {
                    $devolverusuario = tonysusers::where('id', $uid)->first();
                    return ($devolverusuario);
                }

                break;

            case 'tonysobtenerdirecciones':
                $id_user = $data->id_user;
                $direcciones = tonysdirecciones::where('id_user', $id_user)->get();
                return ($direcciones);
                break;

            case 'tonysagregardireccion':

                $id_user = $data->id_user;
                $tipo_direccion = $data->tipo_direccion;
                $direccion_data = $data->direccion_data;

                return tonysdirecciones::create([
                    'id_user' => $id_user,
                    'tipo_direccion' => $tipo_direccion,
                    'direccion_data' => $direccion_data,
                ]);

                break;

            case 'tonysobtenermovimientos':
                $id_user = $data->id_user;
                $movimientos = tonysmovimientos::where('id_user', $id_user)->orderBy('id', 'DESC')->get();
                return ($movimientos);
                break;

            case 'tonysadminobtenermovimientos':
                $movimientos = tonysmovimientos::orderBy('id', 'DESC')->get();
                return ($movimientos);
                break;

            case 'tonysobteneradmindirecciones':
                $admindirecciones = tonysadmindirecciones::get();
                return ($admindirecciones);
                break;

            case 'tonyscrearmovimiento':
                $id_user = $data->id_user;
                $mas_o_menos = $data->mas_o_menos;
                $id_admin_direccion = $data->id_admin_direccion;
                $monto = $data->monto;
                $id_tipo_movimiento = $data->id_tipo_movimiento;
                $reciboImgUrl = $data->reciboImgUrl;
                $traking = $data->traking;
                $peso = $data->peso;
                $origen = $data->origen;
                $observacion = $data->observacion;
                $now = Carbon::now()->format('Ymd');

                return tonysmovimientos::create([
                    'id_user' => $id_user,
                    'mas_o_menos' => $mas_o_menos,
                    'id_admin_direccion' => $id_admin_direccion,
                    'monto' => $monto,
                    'id_tipo_movimiento' => $id_tipo_movimiento,
                    'reciboImgUrl' => $reciboImgUrl,
                    'traking' => $traking,
                    'peso' => $peso,
                    'origen' => $origen,
                    'observacion' => $observacion,
                    'fecha_numerica' => $now,
                ]);
                break;

            case 'tonyssaldodeusuario':
                $id_user = $data->id_user;
                $sumaativos = tonysmovimientos::where('mas_o_menos', '=', 'mas')->where('status', '=', 'verificado')->where('id_user', '=', $id_user)->sum('monto');
                return ($sumaativos);
                break;

            case 'tonysresumenmovimientos':
                $id_user = $data->id_user;
                $resumen[0] = tonysmovimientos::where('id_tipo_movimiento', '=', '1')->where('status', 'recibido')->where('id_user', '=', $id_user)->get();
                $resumen[1] = tonysmovimientos::where('id_tipo_movimiento', '=', '1')->where('status', 'en camino')->where('id_user', '=', $id_user)->get();
                $resumen[2] = tonysmovimientos::where('id_tipo_movimiento', '=', '1')->where('status', 'listo')->where('id_user', '=', $id_user)->get();
                $resumen[3] = tonysmovimientos::where('id_tipo_movimiento', '=', '1')->where('status', 'entregado')->where('id_user', '=', $id_user)->get();
                return ($resumen);
                break;

            case 'tonysadminobtenerlistadeuduarios':
                $listadeusuariospaneladmin = tonysusers::where('tipo_cuenta', '!=', '999')->get();
                return ($listadeusuariospaneladmin);
                break;

            case 'tonysobtenertablafase':
                $tonysadminfasecompleta = tonysadminfase::get();
                return ($tonysadminfasecompleta);
                break;

            case 'agregarfasealatabladefases':
                $limitefaseusd = $data->limitefaseusd;
                $precio_wera_usd = $data->precio_wera_usd;
                $porcentaje = $data->porcentaje;
                $asignaciondetokens = $data->asignaciondetokens;
                $tonyslaultimafase = tonysadminfase::orderBy('id', 'DESC')->first();
                $numerosiguiente = $tonyslaultimafase->numero + 1;
                return tonysadminfase::create([
                    'limitefaseusd' => $limitefaseusd,
                    'precio_wera_usd' => $precio_wera_usd,
                    'porcentaje' => $porcentaje,
                    'asignaciondetokens' => $asignaciondetokens,
                    'numero' => $numerosiguiente,
                ]);
                break;

            case 'tonysobtenerprecio_wera_usd':
                $arraytonysobtenerprecio_wera_usd = tonysadminfase::where('estafase', '=', 1)->first();
                return ($arraytonysobtenerprecio_wera_usd->precio_wera_usd);
                break;

            case 'tonysadminsubirdefase':
                $tipo_cuenta = $data->tipo_cuenta;
                if ($tipo_cuenta == '999') {
                    $respuestadesubidadefase = tonysadminfase::where('estafase', '=', 1)->first();
                    tonysadminfase::where('id', $respuestadesubidadefase->id)->update(['estafase' => '0']);
                    $cualestasfasesestanenuno1 = tonysadminfase::where('estafase', '=', '1')->get();
                    if (count($cualestasfasesestanenuno1) == 0) {
                        $updatedenuevafase = tonysadminfase::where('id', $respuestadesubidadefase->id + 1)->update(['estafase' => '1']);
                        return ($updatedenuevafase);
                    }
                } else {return (0);}

                break;

            case 'tonysverificarunmovimiento':
                $tipo_cuenta = $data->tipo_cuenta;
                $id_movimiento = $data->id_movimiento;
                if ($tipo_cuenta == '999') {
                    $updatedemovimiento = tonysmovimientos::where('id', $id_movimiento)->update(['status' => 'verificado']);
                    return ($updatedemovimiento);
                } else {return (0);}

                break;

            case 'tonyssuspenderunmovimiento':
                $tipo_cuenta = $data->tipo_cuenta;
                $id_movimiento = $data->id_movimiento;
                if ($tipo_cuenta == '999') {
                    $updatedemovimiento = tonysmovimientos::where('id', $id_movimiento)->update(['status' => 'pendiente']);
                    return ($updatedemovimiento);
                } else {return (0);}

                break;

            case 'tonysverificarusuario':
                $tipo_cuenta = $data->tipo_cuenta;
                $id_usuario = $data->id_usuario;
                if ($tipo_cuenta == '999') {
                    $updatedeusuario = tonysusers::where('id', $id_usuario)->update(['status' => 'activo']);
                    return ($updatedeusuario);
                } else {return (0);}

                break;

            case 'tonyssuspenderusuario':
                $tipo_cuenta = $data->tipo_cuenta;
                $id_usuario = $data->id_usuario;
                if ($tipo_cuenta == '999') {
                    $updatedeusuario = tonysusers::where('id', $id_usuario)->update(['status' => 'desactivado']);
                    return ($updatedeusuario);
                } else {return (0);}

                break;

            case 'obtenerbarrauno':
                $barrauno = tonysbarra::where('id', '=', 1)->first();
                return ($barrauno->valor_barra);
                break;

            case 'actualizarbarrauno':
                $tipo_cuenta = $data->tipo_cuenta;
                $valor_barra = $data->valor_barra;
                if ($tipo_cuenta == '999') {
                    $updatebarra = tonysbarra::where('id', '1')->update(['valor_barra' => $valor_barra]);
                    return ($updatebarra);
                } else {return (0);}

                break;

            case 'tonysanuncios':
                $tonysanuncioscompleto = tonysanuncios::orderBy('id', 'DESC')->get();
                return ($tonysanuncioscompleto);
                break;

            case 'tonysagregaranuncio':

                $titulo = $data->titulo;
                $prioridad = $data->prioridad;
                $mensaje = $data->mensaje;

                return tonysanuncios::create([
                    'titulo' => $titulo,
                    'prioridad' => $prioridad,
                    'descripcion' => $mensaje,
                ]);

                break;

            case 'tonysborraranuncio':

                $id = $data->id;
                $respuestadeborrar = tonysanuncios::where('id', $id)->delete();
                return ($respuestadeborrar);
                break;

            case 'tonysactualizaradmindireccion':
                $id = $data->id;
                $pais = $data->pais;
                $nombre = $data->nombre;
                $direccion_1 = $data->direccion_1;
                $ciudad = $data->ciudad;
                $estado = $data->estado;
                $codigo_postal = $data->codigo_postal;
                $telefono = $data->telefono;
                return tonysadmindirecciones::where('id', $id)
                    ->update([
                        'pais' => $pais,
                        'nombre' => $nombre,
                        'direccion_1' => $direccion_1,
                        'ciudad' => $ciudad,
                        'estado' => $estado,
                        'codigo_postal' => $codigo_postal,
                        'telefono' => $telefono,
                    ]);
                break;

            case 'tonysobtenerusuariosbusqueda':
                return tonysusers::where('tipo_cuenta', '0')->orderBy('id', 'DESC')->get();
                break;

            case 'tonysupdatemovimientostatus':
                $status = $data->status;
                $id = $data->id;
                return tonysmovimientos::where('id', $id)->update(['status' => $status]);
                break;

            case 'tonysconsultarreporte':
                $fecha_inicio = $data->fecha_inicio;
                $fecha_fin = $data->fecha_fin;
                $status = $data->status;

                $consultareporte = tonysmovimientos::where('status', '=', $status)->where('fecha_numerica', '>=', $fecha_inicio)->where('fecha_numerica', '<=', $fecha_fin)->orderBy('id', 'DESC')->get();
                $longitud = count($consultareporte);
                for ($i = 0; $i < $longitud; $i++) {
                    if ($consultareporte[$i]->id_user) {
                        $consultareporte[$i]->userdetalles = tonysusers::where('id', $consultareporte[$i]->id_user)->first();
                    }
                }
                return $consultareporte;
                break;

            case 'tonysobtenerdireccionderetiro':
                return tonysdireccionretiro::get();
                break;

            case 'tonysactualizardireccionderetiro':

                $oficina = $data->oficina;
                $direccion = $data->direccion;
                $telefono = $data->telefono;
                $dias = $data->dias;
                $horarios = $data->horarios;
                $contadordeupdates = 0;

                if ($oficina) {

                    tonysdireccionretiro::where('id', '1')
                        ->update([
                            'oficina' => $oficina,
                        ]);
                    $contadordeupdates = $contadordeupdates + 1;
                }
                if ($direccion) {
                    tonysdireccionretiro::where('id', '1')
                        ->update([
                            'direccion' => $direccion,
                        ]);
                    $contadordeupdates = $contadordeupdates + 1;
                }
                if ($telefono) {
                    tonysdireccionretiro::where('id', '1')
                        ->update([
                            'telefono' => $telefono,
                        ]);
                    $contadordeupdates = $contadordeupdates + 1;
                }
                if ($dias) {
                    tonysdireccionretiro::where('id', '1')
                        ->update([
                            'dias' => $dias,
                        ]);
                    $contadordeupdates = $contadordeupdates + 1;
                }
                if ($horarios) {
                    tonysdireccionretiro::where('id', '1')
                        ->update([
                            'horarios' => $horarios,
                        ]);
                    $contadordeupdates = $contadordeupdates + 1;
                }

                if ($contadordeupdates > 0) {
                    return ($contadordeupdates);
                }

                if ($contadordeupdates < 1) {
                    return (0);
                }

                break;

            case 'tonysobteneruserconversaciones':
                $id_user = $data->id_user;
                $conversacionesdeusuario = tonysconversaciones::where('id_user', $id_user)->orderBy('id', 'DESC')->get();
                $longitud = count($conversacionesdeusuario);
                for ($i = 0; $i < $longitud; $i++) {
                    if ($conversacionesdeusuario[$i]->id_user) {
                        $conversacionesdeusuario[$i]->userdetalles = tonysusers::where('id', $conversacionesdeusuario[$i]->id_user)->first();
                    }
                }
                return ($conversacionesdeusuario);
                break;

            case 'tonyscrearticket':
                $id_user = $data->id_user;
                $asunto = $data->asunto;
                $respuestadecrear = tonysconversaciones::create([
                    'id_user' => $id_user,
                    'asunto' => $asunto,
                ]);
                if ($respuestadecrear->id_user) {
                    $respuestadecrear->userdetalles = tonysusers::where('id', $respuestadecrear->id_user)->first();
                }
                return ($respuestadecrear);
                break;

            case 'tonystraermensajesdeconversacion':
                $id_conversacion = $data->id_conversacion;
                $mensajes = tonysmensajes::where('id_conversacion', $id_conversacion)->get();
                return ($mensajes);
                break;

            case 'tonysguardarmensajedeusuario':
                $id_user = $data->id_user;
                $es_admin_mensaje = $data->es_admin_mensaje;
                $mensaje = $data->mensaje;
                $id_conversacion = $data->id_conversacion;
                return tonysmensajes::create([
                    'id_user' => $id_user,
                    'es_admin_mensaje' => $es_admin_mensaje,
                    'mensaje' => $mensaje,
                    'id_conversacion' => $id_conversacion,

                ]);

                break;

            case 'tonyscerrarconversacion':
                $id = $data->id;
                return tonysconversaciones::where('id', $id)
                    ->update([
                        'status' => 'cerrado',
                    ]);
                break;

            case 'tonysobteneradminconversaciones':
                $conversacionesdeusuario = tonysconversaciones::orderBy('id', 'DESC')->get();
                $longitud = count($conversacionesdeusuario);
                for ($i = 0; $i < $longitud; $i++) {
                    if ($conversacionesdeusuario[$i]->id_user) {
                        $conversacionesdeusuario[$i]->userdetalles = tonysusers::where('id', $conversacionesdeusuario[$i]->id_user)->first();
                    }
                }
                return ($conversacionesdeusuario);
                break;

            case 'tonysagregararchivonuevo':
                $usuarios = $data->usuarios;
                $extension = $data->extension;
                $pesoarchivo = $data->pesoarchivo;
                $nombrearchivo = $data->nombrearchivo;
                $recomendacion = $data->recomendacion;
                $observacion = $data->observacion;
                $type = $data->type;
                $antesdelacoma = $data->antesdelacoma;
                $despuesdelacoma = $data->despuesdelacoma;
                $file = base64_decode($despuesdelacoma);
                $folderName = 'public_html/public/tonys/archivos/';
                $safeName = Str::random(12) . '.' . $extension;
                $destinationPath = public_path() . $folderName;
                $success = file_put_contents(public_path() . '/../../public_html/public/tonys/archivos/' . $safeName, $file);
                $ruta = 'https://nube.gq/public/tonys/archivos/';
                $enlace = $ruta . $safeName;

                $fileinfoguardada = tonysmovimientos::create([
                    'reciboImgUrl' => $enlace,
                    'traking' => $nombrearchivo,
                    'peso' => $pesoarchivo,
                    'origen' => $recomendacion,
                    'observacion' => $observacion,
                    'mas_o_menos' => $extension,
                ]);

                $longitudusuarios = count($usuarios);
                if ($longitudusuarios > 0) {
                    $nuevavariable = array();
                    $nuevavariable2 = array();
                    for ($i = 0; $i < $longitudusuarios; $i++) {
                        $nuevavariable[$i] = $usuarios[$i]['id'];
                        $nuevavariable2[$i] = $fileinfoguardada->id;
                    }
                    //arreglo para cada insert en sesiones
                    foreach ($nuevavariable as $index => $unit) {
                        $results[] = [
                            'usuario' => $nuevavariable[$index],
                            'id_archivo' => $nuevavariable2[$index],
                        ];
                    }
                    $response = tonysarchivosusuarios::insert($results);
                    return ($response);
                } else {
                    return ($fileinfoguardada);
                }
                // $fileinfoguardada->id
                break;

            case 'tonysverusuariosdearchivo':
                $id = $data->id;
                $usuariosdearchivo = tonysarchivosusuarios::where('id_archivo', $id)->orderBy('id', 'DESC')->get();
                $usuariosdearchivolongitud = count($usuariosdearchivo);
                for ($i = 0; $i < $usuariosdearchivolongitud; $i++) {
                    $comprobarsiexiste = tonysusers::where('id', $usuariosdearchivo[$i]->usuario)->first();
                    if ($comprobarsiexiste) {
                        $usuariosdearchivo[$i]->detalles = tonysusers::where('id', $usuariosdearchivo[$i]->usuario)->orderBy('id', 'DESC')->first();
                    }
                }
                return ($usuariosdearchivo);
                break;

            case 'tonysagregarusuarioaarchivo':
                $usuarios = $data->usuarios;
                $id_archivo = $data->id_archivo;
                $longitudusuarios = count($usuarios);
                if ($longitudusuarios > 0) {
                    $nuevavariable = array();
                    $nuevavariable2 = array();
                    for ($i = 0; $i < $longitudusuarios; $i++) {
                        $versiexisteusuariodearchivo = tonysarchivosusuarios::where('id_archivo', $id_archivo)->where('usuario', $usuarios[$i]['id'])->first();
                        if (!$versiexisteusuariodearchivo) {
                            $nuevavariable[$i] = $usuarios[$i]['id'];
                            $nuevavariable2[$i] = $id_archivo;
                        }
                    }

                    $results = array();
                    //arreglo para cada insert en sesiones
                    foreach ($nuevavariable as $index => $unit) {
                        $results[] = [
                            'usuario' => $nuevavariable[$index],
                            'id_archivo' => $nuevavariable2[$index],
                        ];
                    }

                    // $longitudresultados = count($results);

                    if (count($results) > 0) {
                        $response = tonysarchivosusuarios::insert($results);
                        return ($response);
                    }
                } else {
                    return (null);
                }

                break;

            case 'tonysborrarusuariodeunarchivo':
                $usuario = $data->usuario;
                $id_archivo = $data->id_archivo;
                $respuestadeborrar = tonysarchivosusuarios::where('usuario', $usuario)->where('id_archivo', $id_archivo)->delete();
                return ($respuestadeborrar);
                break;

            case 'tonystraerarchivosdeusuario':
                $id = $data->id;
                $consultadearchivos = tonysarchivosusuarios::where('usuario', $id)->get();
                if (count($consultadearchivos) > 0) {

                    $archivoslongitud = count($consultadearchivos);
                    for ($i = 0; $i < $archivoslongitud; $i++) {
                        $comprobarsiexiste = tonysmovimientos::where('id', $consultadearchivos[$i]->id_archivo)->first();
                        if ($comprobarsiexiste) {
                            $consultadearchivos[$i]->detalles = tonysmovimientos::where('id', $consultadearchivos[$i]->id_archivo)->orderBy('id', 'DESC')->first();
                        }
                    }
                    return ($consultadearchivos);

                } else {
                    return (null);

                }
                break;

            case 'tonyscrearformulario':
                $nombre = $data->nombre;
                $creacion = tonysformularios::create([
                    'nombre' => $nombre,
                ]);
                return ($creacion);
                break;

            case 'tonysobteneadminrformularios':
                $adminformularios = tonysformularios::get();
                return ($adminformularios);
                break;

            case 'tonysobtenerpreguntasdeformulario':
                $id = $data->id;
                $adminformularios = tonyspreguntascuestionarios::where('id_formulario', $id)->get();
                return ($adminformularios);
                break;

            case 'tonysobtenerpreguntasdeformularioborrarla':
                $id = $data->id;
                $respuestatonysobtenerpreguntasdeformularioborrarla = tonyspreguntascuestionarios::where('id', $id)->delete();
                return ($respuestatonysobtenerpreguntasdeformularioborrarla);
                break;

            case 'tonysagregarpreguntadeformulario':
                $id_formulario = $data->id_formulario;
                $tipo = $data->tipo_pregunta;
                $pregunta = $data->pregunta;
                $a = $data->a;
                $b = $data->b;
                $c = $data->c;
                $d = $data->d;
                $e = $data->e;
                $f = $data->f;
                $creacionformulario = tonyspreguntascuestionarios::create([
                    'id_formulario' => $id_formulario,
                    'tipo' => $tipo,
                    'pregunta' => $pregunta,
                    'a' => $a,
                    'b' => $b,
                    'c' => $c,
                    'd' => $d,
                    'e' => $e,
                    'f' => $f,
                ]);
                return ($creacionformulario);

                break;

            case 'tonysverusuariosdeformulario':
                $id = $data->id;
                $usuariosdeformulario = tonysformulariosusuarios::where('id_formulario', $id)->orderBy('id', 'DESC')->get();
                $usuariosdeformulariolongitud = count($usuariosdeformulario);
                for ($i = 0; $i < $usuariosdeformulariolongitud; $i++) {
                    $comprobarsiexiste = tonysusers::where('id', $usuariosdeformulario[$i]->usuario)->first();
                    if ($comprobarsiexiste) {
                        $usuariosdeformulario[$i]->detalles = tonysusers::where('id', $usuariosdeformulario[$i]->usuario)->orderBy('id', 'DESC')->first();
                    }
                }
                return ($usuariosdeformulario);
                break;

            case 'tonysagregarusuarioaformulario':
                $usuarios = $data->usuarios;
                $id_formulario = $data->id_formulario;
                $longitudusuarios = count($usuarios);
                if ($longitudusuarios > 0) {
                    $nuevavariable = array();
                    $nuevavariable2 = array();
                    for ($i = 0; $i < $longitudusuarios; $i++) {
                        $versiexisteusuariodeformulario = tonysformulariosusuarios::where('id_formulario', $id_formulario)->where('usuario', $usuarios[$i]['id'])->first();
                        if (!$versiexisteusuariodeformulario) {
                            $nuevavariable[$i] = $usuarios[$i]['id'];
                            $nuevavariable2[$i] = $id_formulario;
                        }
                    }

                    $results = array();
                    //arreglo para cada insert en sesiones
                    foreach ($nuevavariable as $index => $unit) {
                        $results[] = [
                            'usuario' => $nuevavariable[$index],
                            'id_formulario' => $nuevavariable2[$index],
                        ];
                    }

                    // $longitudresultados = count($results);

                    if (count($results) > 0) {
                        $response = tonysformulariosusuarios::insert($results);
                        return ($response);
                    }
                } else {
                    return (null);
                }

                break;

            case 'tonysborrarusuariodeunformulario':
                $usuario = $data->usuario;
                $id_formulario = $data->id_formulario;
                $respuestadeborrar = tonysformulariosusuarios::where('usuario', $usuario)->where('id_formulario', $id_formulario)->delete();
                return ($respuestadeborrar);
                break;

            case 'tonystraerformulariosdeusuario':
                $id = $data->id;
                $consultadeformularios = tonysformulariosusuarios::where('usuario', $id)->get();
                if (count($consultadeformularios) > 0) {

                    $formularioslongitud = count($consultadeformularios);
                    for ($i = 0; $i < $formularioslongitud; $i++) {
                        $comprobarsiexiste = tonysformularios::where('id', $consultadeformularios[$i]->id_formulario)->first();
                        if ($comprobarsiexiste) {
                            $consultadeformularios[$i]->detalles = tonysformularios::where('id', $consultadeformularios[$i]->id_formulario)->orderBy('id', 'DESC')->first();
                        }
                    }
                    return ($consultadeformularios);

                } else {
                    return (null);

                }
                break;

            case 'tonysobtenerpreguntasdeformulariousuarios':
                $id = $data->id;
                $adminformularios = tonyspreguntascuestionarios::where('id_formulario', $id)->get();
                return ($adminformularios);
                break;

            case 'tonysguardarrespuestadeformulario':
                $respuestas = $data->respuestas;
                $id_usuario_que_respondio = $data->id_usuario_que_respondio;
                $id_publico = substr(str_shuffle("qwertyuiopasdfghjklzxcvbnm1234567890"), 0, 6);
                $seraqueexiste = tonysrespuestaspreguntascuestionarios::where('id_publico', $id_publico)->get();
                if (count($seraqueexiste) > 0) {
                    $id_publico = substr(str_shuffle("qwertyuiopasdfghjklzxcvbnm1234567890"), 0, 6);
                }
                $longitudrespuestas = count($respuestas);
                $nuevavariable = array();
                $nuevavariable1 = array();
                $nuevavariable2 = array();
                $nuevavariable3 = array();
                $nuevavariable33 = array();
                $nuevavariable4 = array();
                $nuevavariable5 = array();
                $nuevavariable55 = array();
                $nuevavariable6 = array();
                $nuevavariable7 = array();
                $nuevavariable8 = array();
                $nuevavariable10 = array();
                $nuevavariable11 = array();

                for ($i = 0; $i < $longitudrespuestas; $i++) {
                    $nuevavariable[$i] = $respuestas[$i]['id'];
                    $nuevavariable1[$i] = $respuestas[$i]['id_formulario'];
                    $nuevavariable2[$i] = $respuestas[$i]['tipo'];
                    $nuevavariable3[$i] = $id_publico;
                    $nuevavariable33[$i] = $id_usuario_que_respondio;
                    $nuevavariable4[$i] = $respuestas[$i]['respuestacerrada'];
                    $nuevavariable5[$i] = $respuestas[$i]['respuestaabierta'];
                    $nuevavariable55[$i] = $respuestas[$i]['pregunta'];
                    $nuevavariable6[$i] = $respuestas[$i]['a'];
                    $nuevavariable7[$i] = $respuestas[$i]['b'];
                    $nuevavariable8[$i] = $respuestas[$i]['c'];
                    $nuevavariable9[$i] = $respuestas[$i]['d'];
                    $nuevavariable10[$i] = $respuestas[$i]['e'];
                    $nuevavariable11[$i] = $respuestas[$i]['f'];

                }

                foreach ($nuevavariable as $index => $unit) {
                    $results[] = [
                        'id_pregunta' => $nuevavariable[$index],
                        'id_formulario' => $nuevavariable1[$index],
                        'tipo' => $nuevavariable2[$index],
                        'id_publico' => $nuevavariable3[$index],
                        'id_usuario_que_respondio' => $nuevavariable33[$index],
                        'respuestacerrada' => $nuevavariable4[$index],
                        'respuestaabierta' => $nuevavariable5[$index],
                        'pregunta' => $nuevavariable55[$index],
                        'a' => $nuevavariable6[$index],
                        'b' => $nuevavariable7[$index],
                        'c' => $nuevavariable8[$index],
                        'd' => $nuevavariable9[$index],
                        'e' => $nuevavariable10[$index],
                        'f' => $nuevavariable11[$index],

                    ];
                }

                $response = tonysrespuestaspreguntascuestionarios::insert($results);
                if ($response = true) {
                    return ($results);
                }

                break;
            case 'tonysvisualizarformularioresuelto':
                $id_publico = $data->id_publico;
                $respuestasdeesteformulario = tonysrespuestaspreguntascuestionarios::where('id_publico', $id_publico)->get();
                $consultadeusuario = tonysusers::where('id', $respuestasdeesteformulario[0]->id_usuario_que_respondio)->get();
                if ($consultadeusuario) {
                    if ($consultadeusuario[0]->name && $consultadeusuario[0]->lastname) {
                        $respuestasdeesteformulario[0]->nombre_usuario_que_respondio = $consultadeusuario[0]->name . ' ' . $consultadeusuario[0]->lastname;

                    }
                }
                return ($respuestasdeesteformulario);
                break;

            case 'tonysenviaremail':
                // $amount_person = $data->amount_person;
                // $emaildecodificado = json_decode($data->emailcorreo);
                $to = $data->to;
                $id_publico = $data->id_publico;
                $datestring = $data->datestring;
                $nombre_usuario_que_respondio = $data->nombre_usuario_que_respondio;
                Mail::to($to)->send(new TonysRespuestasDeFormulario(
                    $id_publico,
                    $nombre_usuario_que_respondio,
                    $datestring,
                ));

                // Reservation::create([
                //     ]);
                // Mail::to($email, 'LikeIU')->send(new ReservationEmail(
                //     $amount_person,
                //     $amount_person,
                //     $amount_person));
                return response()->json($data, 200);

                break;

            case 'tonysborrarusuario':
                $id = $data->id;
                $respuestadeborrarusuario = tonysusers::where('id', $id)->delete();
                return ($respuestadeborrarusuario);
                break;

            case 'tonysborrararchivos':
                $id = $data->id;
                $respuestadeborrarmovimiento = tonysmovimientos::where('id', $id)->delete();
                return ($respuestadeborrarmovimiento);
                break;

            case 'tonysborrarformularios':
                $id = $data->id;
                $respuestadeborrarmovimiento = tonysformularios::where('id', $id)->delete();
                return ($respuestadeborrarmovimiento);
                break;

            case 'tonysdetallesdelhome':
                $id = $data->id;
                $detallesdelhome[0] = tonysarchivosusuarios::where('usuario', $id)->get();
                $detallesdelhomefiltrado[0] = 0;
                $detallesdelhomefiltrado[1] = 0;
                $usuariosdearchivolongitud = count($detallesdelhome[0]);
                for ($i = 0; $i < $usuariosdearchivolongitud; $i++) {
                    $comprobarsiexiste = tonysmovimientos::where('id', $detallesdelhome[0][$i]->id_archivo)->first();
                    if ($comprobarsiexiste) {
                        $detallesdelhomefiltrado[0] = $detallesdelhomefiltrado[0] + 1;
                    }
                }

                $detallesdelhome[1] = tonysformulariosusuarios::where('usuario', $id)->get();
                $usuariosdeformularioslongitud = count($detallesdelhome[1]);
                for ($i = 0; $i < $usuariosdeformularioslongitud; $i++) {
                    $comprobarsiexiste = tonysformularios::where('id', $detallesdelhome[1][$i]->id_formulario)->first();
                    if ($comprobarsiexiste) {
                        $detallesdelhomefiltrado[1] = $detallesdelhomefiltrado[1] + 1;
                    }
                }
                // $detallesdelhome[2]=tonysrespuestaspreguntascuestionarios::where('usuario',$id)->get();

                return ($detallesdelhomefiltrado);
                break;

            //tonys FIN
            //tonys FIN
