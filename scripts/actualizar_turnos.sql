DO $$
DECLARE
  turno RECORD;
  id_mesas INTEGER[];
  suma_capacidad INTEGER;
  plazas_loc1 INTEGER;
  plazas_loc2 INTEGER;
BEGIN
  -- Iterar sobre todos los turnos
  FOR turno IN SELECT * FROM turnos LOOP
    -- Obtener todas las mesas disponibles para este restaurante
    SELECT ARRAY_AGG(id) AS id_mesas, SUM(capacidad) AS total_capacidad
    INTO id_mesas, suma_capacidad
    FROM mesas
    WHERE restauranteId = turno.restauranteId;

    -- Manejar valores NULL (si no hay mesas disponibles)
    IF id_mesas IS NULL THEN
      id_mesas := ARRAY[]::INTEGER[];
    END IF;
    IF suma_capacidad IS NULL THEN
      suma_capacidad := 0;
    END IF;

    -- Calcular plazas disponibles en loc1
    SELECT SUM(capacidad)
    INTO plazas_loc1
    FROM mesas
    WHERE id = ANY(id_mesas) AND localizacion = 'loc1';

    -- Calcular plazas disponibles en loc2
    SELECT SUM(capacidad)
    INTO plazas_loc2
    FROM mesas
    WHERE id = ANY(id_mesas) AND localizacion = 'loc2';

    -- Manejar valores NULL (si no hay mesas disponibles en loc1 o loc2)
    IF plazas_loc1 IS NULL THEN
        plazas_loc1 := 0;
    END IF;
    IF plazas_loc2 IS NULL THEN
        plazas_loc2 := 0;
    END IF;

    -- Actualizar turno con todos los datos calculados
    UPDATE turnos
    SET idMesasDisponibles = id_mesas,
        plazasDisponibles = suma_capacidad,
        plazasDisponiblesLoc1 = plazas_loc1,
        plazasDisponiblesLoc2 = plazas_loc2,
        maximoComensales = GREATEST(plazas_loc1, plazas_loc2)
    WHERE id = turno.id;
  END LOOP;
END $$;
