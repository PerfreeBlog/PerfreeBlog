package com.perfree.controller.auth.attachLibrary.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
* @description 附件库 AddReqVO
* @author Perfree
**/
@Schema(description = "附件库AddReqVO")
@Data
@EqualsAndHashCode(callSuper = true)
public class AttachLibraryAddReqVO extends AttachLibraryBaseVO{
}
