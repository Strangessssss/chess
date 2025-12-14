import PositionType from "@/ chess/types/interfaces/position";
import {PieceEnum} from "@/ chess/types/enums/piece";
import {ColorEnum} from "@/ chess/types/enums/color";

export default interface PieceType {
    id: number;
    position: PositionType;
    piece: PieceEnum;
    color: ColorEnum;
}