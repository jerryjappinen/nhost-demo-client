alter table "storage"."files"
  add constraint "files_upload_id_fkey"
  foreign key ("upload_id")
  references "public"."uploads"
  ("id") on update restrict on delete restrict;
