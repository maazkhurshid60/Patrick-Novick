-- Turso/libSQL dump
-- database: libsql://metro-associates-metro-associates.aws-ap-south-1.turso.io
-- created:  2026-07-01T16:55:15.059Z
PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

-- ---------- table: campaign_recipients ----------
DROP TABLE IF EXISTS "campaign_recipients";
CREATE TABLE campaign_recipients (
    campaign_id INTEGER NOT NULL,
    email       TEXT NOT NULL,
    sent_at     INTEGER NOT NULL DEFAULT (unixepoch()),
    PRIMARY KEY (campaign_id, email)
  );
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (19, 'in.sultan60@gmail.com', 1781094886);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (19, 'zohaibe840@gmail.com', 1781094886);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (20, 'zohaibe840@gmail.com', 1781194347);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (20, 'pnovick@hotmail.com', 1781194347);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (20, 'patrick@metroassoc.com', 1781194347);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (21, 'in.sultan60@gmail.com', 1781196912);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (21, 'zohaibe840@gmail.com', 1781196912);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (21, 'pnovick@hotmail.com', 1781196912);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (21, 'patrick@metroassoc.com', 1781196912);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (22, 'in.sultan60@gmail.com', 1781197242);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (22, 'zohaibe840@gmail.com', 1781197242);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (22, 'pnovick@hotmail.com', 1781197242);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (22, 'patrick@metroassoc.com', 1781197242);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (23, 'in.sultan60@gmail.com', 1781281501);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (23, 'zohaibe840@gmail.com', 1781281501);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (23, 'pnovick@hotmail.com', 1781281501);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (24, 'zohaibe840@gmail.com', 1781530731);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (25, 'zohaibe840@gmail.com', 1781531191);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (25, 'maaz.khurshid.work@gmail.com', 1781531191);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (26, 'zohaibe840@gmail.com', 1781531462);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (26, 'maaz.khurshid.work@gmail.com', 1781531462);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (26, 'patrick@metroassoc.com', 1781531462);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (26, 'pnovick@hotmail.com', 1781531462);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (28, 'zohaibe840@gmail.com', 1781612492);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (28, 'maaz.khurshid.work@gmail.com', 1781612492);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (30, 'jbmcgovern@transystems.com', 1781614071);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (30, 'ralph@vbtechcorp.com', 1781614071);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (30, 'soneill@vhb.com', 1781614071);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (30, 'rbousa@vhb.com', 1781614071);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (30, 'jcostello@wmcengineers.com', 1781614071);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (30, 'casalep@wseinc.com', 1781614071);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (30, 'jason.gallant@wright-pierce.com', 1781614071);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (30, 'anthony.moretti@wsp.com', 1781614071);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (30, 'patrick@metroassoc.com', 1781614071);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (30, 'fiveer840@gmail.com', 1781614071);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (32, 'zohaibe840@gmail.com', 1781619014);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'pmagyar@haleyward.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'car@luminalidar.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'jpope@msimarinesolutions.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'mmdunay@modjeski.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'jeffrey.long@mottmac.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'marketing@mpengs.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'sajjad.alam@parsons.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'kbeek@patrickco.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'rroberts@pennoni.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'kumarb@primeeng.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'rsaleh@rhsconsultingdesign.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'andrew.lessard@stantec.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'martin.pierce@steereengineering.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'david.breza@stvinc.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'jscala@tectonicengineering.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'bmercure@tectonicengineering.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'jtrunfio@theengineeringcorp.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'slonusl@wseinc.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'fiveer840@gmail.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (34, 'news@patricknovick.com', 1781706403);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (36, 'zohaibe840@gmail.com', 1781715497);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (36, 'patrick@metroassoc.com', 1781715497);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'kmcgaw@consoreng.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'jmessier@consoreng.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'kboerner@gfnet.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'echuang@garginc.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'garg-ct@garginc.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'myako@geiconsultants.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'sbartkus@gm2inc.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'ko@greenintl.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'kfarhoumand@greenintl.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'gjohnson@gpinet.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'twilson@hwlochner.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'chylas@hwlochner.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'sharlacker@hardesty-hanover.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'sandra.stavola@hdrinc.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'james.jackson@hdrinc.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'jargiro@hntb.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'rifranciamore@hntb.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'ldigovanni@hntb.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'mlow@hoyletanner.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'larry.murphy@jacobs.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'julie.vers@jvcengineering.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'nkulikauskas@kleinfelder.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'info@kseng.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'achakraborty@kseng.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'tkendrick@mjinc.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'wmccarthy@mgmclaren.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'sdelesdernier@mbakerintl.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'cassey.weed@mbakerintl.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'patrick@metroassoc.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (39, 'fiveer840@gmail.com', 1781777571);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'patrick@metroassoc.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'fiveer840@gmail.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'news@patricknovick.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'jeffrey.sam@aecom.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'amahajan@aiengineers.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'apatel@aiengineers.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'aambrosio@aiengineers.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'mabayadullah@aiengineers.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'olivia@aiengineers.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'vkonda@aiengineers.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'zkhan@aiengineers.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'kfarhoumand@aiengineers.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'mharrison@aiengineers.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'dshowry@ataneconsulting.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'jmarini@ataneconsulting.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'khenry@ataneconsulting.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'christopher@beta-inc.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'aglines@fando.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'arthur.zeman@fando.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'jeffrey.bruso@gza.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'todd.greene@gza.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'steven@hartengr.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'jmount@hntb.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'gpalumbojr@jhlynch.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (41, 'ateliska@jensenhughes.com', 1782743559);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'georges@adicesarepc.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'michael.mccarthy@aecom.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'aislam@aiengineers.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'sdrechsler@benesch.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'fbalassone@ataneconsulting.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'mzessin@bartonandloguidice.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'deepa@besinceng.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'nhabesch@beta-inc.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'ngiardina@blcompanies.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'cvany@cvassociatesny.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'jac3@cardinal-engineering.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'scalisej@cdmsmith.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'rfaulkner@chasolutions.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'slemoine@collinsengr.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'kmcgaw@consoreng.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'walter.clark@exp.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'figgqual@figgbridge.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'gdorosh@fando.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'kboerner@gfnet.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'myako@geiconsultants.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'sbartkus@gm2inc.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'ko@greenintl.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'gjohnson@gpinet.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'sharlacker@hardesty-hanover.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'mlow@hoyletanner.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'larry.murphy@jacobs.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'julie.vers@jvcengineering.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'nkulikauskas@kleinfelder.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'info@kseng.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'pmagyar@haleyward.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'car@luminalidar.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'jpope@msimarinesolutions.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'tkendrick@mjinc.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'wmccarthy@mgmclaren.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'mmdunay@modjeski.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'jeffrey.long@mottmac.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'marketing@mpengs.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'sajjad.alam@parsons.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'kbeek@patrickco.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'rroberts@pennoni.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'kumarb@primeeng.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'rsaleh@rhsconsultingdesign.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'andrew.lessard@stantec.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'martin.pierce@steereengineering.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'david.breza@stvinc.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'jtrunfio@theengineeringcorp.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'jbmcgovern@transystems.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'ralph@vbtechcorp.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'jcostello@wmcengineers.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'casalep@wseinc.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'jason.gallant@wright-pierce.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'anthony.moretti@wsp.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'echuang@garginc.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'twilson@hwlochner.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'sandra.stavola@hdrinc.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'jargiro@hntb.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'sdelesdernier@mbakerintl.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'jscala@tectonicengineering.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (42, 'soneill@vhb.com', 1782829955);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'mgateau@2lsconsulting.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'ekeane@2lsconsulting.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'jlatterman@2lsconsulting.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'gleone@2lsconsulting.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'psoames@2lsconsulting.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'tzahirudin@2lsconsulting.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'bjaglal@2lsconsulting.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'jalfieri@akrf.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'lbischoff@akrf.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'gmarcus@akrf.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'emoore@akrf.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'benjaminsachwald@gmail.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'sbakas@arqmia.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'bfort@arquitectonica.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'sgutierrez@arquitectonica.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'jkurzner@utexas.edu', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'treedy@arquitectonica.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'lspear@arquitectonica.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'mga@bala.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'jhb@bala.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'kdb@bala.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'bhc@bala.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'asd@bala.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'hebafahmy@live.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'luisformoso776@gmail.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'atg@bala.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'dcj@bala.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'cbk@bala.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'shl@bala.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'kmt@bala.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'rjv@bala.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'bandtesq@hotmail.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'darin@bcengineer.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'jbasil@becht.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'laurie@becht.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'rbryant@bechtbt.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'cbryant@bechtbt.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'ecollins0216@verizon.net', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'lcopeland@bechtbt.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'alawlor@bechtbt.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'jlichon@bechtbt.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'cbarnes@bokapowell.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'jbarnum@bokapowell.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'mdabney@bokapowell.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'tdwyer@bokapowell.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'jhilliard@bokapowell.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'hleimann@bokapowell.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'jorfield@bokapowell.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'dpowell@bokapowell.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (43, 'kdowney@bsals.com', 1782830350);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (44, 'zohaibe840@gmail.com', 1782915924);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'rfetz@bsals.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'plangowski@bsalifestructures.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'djacobs@bsalifestructures.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'mcanin@canin.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'mcastro@canin.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'pbabigian@ceramiassociates.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'vcerami@ceramiassociates.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'ddulgerian@ceramiassociates.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'mezold@ceramiassociates.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'mferrara@ceramiassociates.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'dannyro24@gmail.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'jlau@ceramiassociates.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'aleslie@ceramiassociates.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'amaniscalco@ceramiassociates.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'emanito@ceramiassociates.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'tmuench@ceramiassociates.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'cpeltier@ceramiassociates.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'jschreier@ceramiassociates.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'gary@cbaarchitects.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'butch@cbaarchitects.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'david@cbaarchitects.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'cbuscarino@theclarientgroup.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'ascimeca@theclarientgroup.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'lilburntomcat992@gmail.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'sclaxton@cmtaegrs.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'jfarber@cmtaegrs.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'ggehrt@cmtaegrs.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'pguffey@cmtaegrs.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'thans@cmtaegrs.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'lharrelson@cmtaegrs.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'mhinkel@cmtaegrs.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'tgmorris@cmtaegrs.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'kmussler@cmtaegrs.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'trohrbaugh@cmtaegrs.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'kseibert@cmtaegrs.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'mseibert@cmtaegrs.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'jeremy@cmtaegrs.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'gswaluk@cmtaegrs.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'tannestephens@gmail.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'ebarbieri@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'zbiler@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'sceasar@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'pcosta@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'dderobertis@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'rduke@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'aenache@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'jfox@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'skokotos@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'rkuzmicki@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'rleber@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'lledonne@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'mlosquadro@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'dmass@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'mmaybaum@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'lmordetsky@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'wsmith@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'psosniak@gmail.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'ovaidean@cosentini.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'byozwiak@optonline.net', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'joshzweback@gmail.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'shay@teamdtc.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'steve.gendreau@teamdtc.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'xjenn01x@gmail.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'bruce.cohen@stantec.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'mdonolli@edzuck.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'shhjfh@aol.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'cmartalus@edzuck.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'pjsposato@edzuck.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'joe.thompson@stantec.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'acuadra@en-powergroup.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'mscorrano@en-powergroup.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'jgerbner@ewingcole.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'rghisu@ewingcole.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'rrudy@ewingcole.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (45, 'aalbin@eypae.com', 1782916212);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'cborland@hwlochner.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'dan.fitzgerald@hwlochner.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'jcaponi@hwlochner.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'sqabbal@hwlochner.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'joshua.roseberg@mbakerintl.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'slafleur@ataneconsulting.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'ebuzzi@nei-cds.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'ajudd@shawmut.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'cfay@vhb.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'lgalkowski@vhb.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'mbowe@vhb.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'rrhodes@vhb.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'sryan@vhb.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'shobson@vhb.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'eric.offenberg@wsp.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'matthew.sullivan@wsp.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'nizzo@geiconsultants.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'pfusco@parecorp.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'bmahoney@collinsengr.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'bquinn@geiconsultants.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'dabbott@geiconsultants.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'nmerriman@geiconsultants.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'wmcgrath@beta-inc.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'srichtarik@beta-inc.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'mshute@beta-inc.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'jlinhares@beta-inc.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'tperez@vhb.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'jrosen@vhb.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'alevin@vhb.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'jstabach@vhb.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'jdufresne@vhb.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'slindgren@vhb.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'tlucivero@vhb.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'jklein@vhb.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'rcodega@vhb.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'stevenmorin@johnrocchiocorp.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'josephgodino@johnrocchiocorp.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'kberchielli@parecorp.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'caleigh.duffy@aecom.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'christi.fragale@wsp.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'tturcotte@parecorp.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'bblanchard@parecorp.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'bwrigley@parecorp.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'cmorrison@parecorp.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'cadamo@parecorp.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'bsykes@parecorp.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'delwell@parecorp.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'esilva@parecorp.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'jsimmons@beta-inc.com', 1782916298);
INSERT INTO "campaign_recipients" ("campaign_id", "email", "sent_at") VALUES (46, 'jmcloughlin@beta-inc.com', 1782916298);

-- ---------- table: campaigns ----------
DROP TABLE IF EXISTS "campaigns";
CREATE TABLE campaigns (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    subject         TEXT NOT NULL,
    body            TEXT NOT NULL,
    recipient_count INTEGER NOT NULL DEFAULT 0,
    status          TEXT NOT NULL DEFAULT 'sent',
    brevo_msg_id    TEXT,
    sent_at         INTEGER NOT NULL DEFAULT (unixepoch())
  , target_list TEXT, list_id INTEGER);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (4, 'Following up — {{role}} opportunity', '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Metro Associates</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:''Helvetica Neue'',Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">Quick follow-up on the {{role}} role — no pressure, just checking in.</div>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:#1a1a2e;border-radius:12px 12px 0 0;padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Metro</span>
                    <span style="font-size:20px;font-weight:800;color:#e63946;">.</span>
                    <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Associates</span>
                  </td>
                  <td align="right">
                    <span style="font-size:11px;color:rgba(255,255,255,0.4);font-weight:500;letter-spacing:1px;text-transform:uppercase;">Executive Recruiting</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
              <div style="font-size:15px;line-height:1.75;color:#1a1a2e;">
                
<p style="margin:0 0 20px;font-size:15px;color:#1a1a2e;">Hi {{first_name}},</p>

<p style="margin:0 0 16px;">I wanted to follow up on my previous message regarding the <strong style="color:#1a1a2e;">{{role}}</strong> opportunity.</p>

<p style="margin:0 0 16px;">I completely understand you''re busy — I just wanted to make sure my note didn''t get buried. Even if the timing isn''t quite right, I''d genuinely love to keep you in mind for future roles.</p>

<!-- CTA box -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
  <tr>
    <td align="center" style="background:#f9f9f9;border-radius:8px;padding:24px;">
      <p style="margin:0 0 12px;font-size:14px;color:#666;">Would you have 10 minutes for a quick call?</p>
      <a href="mailto:patrick@metroassoc.com?subject=Re: {{role}} opportunity"
         style="display:inline-block;background:#e63946;color:#fff;font-size:13px;font-weight:700;padding:12px 28px;border-radius:50px;text-decoration:none;letter-spacing:0.3px;">
        Reply to Connect
      </a>
    </td>
  </tr>
</table>

<p style="margin:0 0 16px;">No pressure at all — I appreciate your time either way.</p>

<p style="margin:0;">Best,</p>
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9f9f9;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 12px 12px;padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#1a1a2e;">Patrick Novick</p>
                    <p style="margin:0 0 2px;font-size:12px;color:#666;">Senior Recruiter — Metro Associates</p>
                    <p style="margin:0;font-size:12px;color:#999;">
                      <a href="mailto:patrick@metroassoc.com" style="color:#e63946;text-decoration:none;">patrick@metroassoc.com</a>
                      &nbsp;·&nbsp;+1 (239) 255-5921
                    </p>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <p style="margin:0;font-size:11px;color:#bbb;line-height:1.5;">
                      Metro Associates<br/>
                      <a href="https://patricknovick.com" style="color:#bbb;text-decoration:none;">patricknovick.com</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:16px;border-top:1px solid #e8e8e8;margin-top:16px;">
                    <p style="margin:0;font-size:10px;color:#bbb;line-height:1.5;">
                      You are receiving this because you are a professional in our network.
                      If you''d prefer not to receive future emails, simply reply with "unsubscribe."
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>', 3, 'sent', '<202605261328.87140233473@smtp-relay.mailin.fr>', 1779802114, NULL, NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (5, 'Following up — {{role}} opportunity', '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Metro Associates</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:''Helvetica Neue'',Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">Quick follow-up on the role — no pressure, just checking in.</div>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:#1a1a2e;border-radius:12px 12px 0 0;padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Metro</span>
                    <span style="font-size:20px;font-weight:800;color:#e63946;">.</span>
                    <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Associates</span>
                  </td>
                  <td align="right">
                    <span style="font-size:11px;color:rgba(255,255,255,0.4);font-weight:500;letter-spacing:1px;text-transform:uppercase;">Executive Recruiting</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
              <div style="font-size:15px;line-height:1.75;color:#1a1a2e;">
                
<p style="margin:0 0 20px;font-size:15px;color:#1a1a2e;">Hi {{first_name}},</p>

<p style="margin:0 0 16px;">I wanted to follow up on my previous message regarding the <strong style="color:#1a1a2e;">{{role}}</strong> opportunity.</p>

<p style="margin:0 0 16px;">I completely understand you''re busy — I just wanted to make sure my note didn''t get buried. Even if the timing isn''t quite right, I''d genuinely love to keep you in mind for future roles.</p>

<!-- CTA box -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
  <tr>
    <td align="center" style="background:#f9f9f9;border-radius:8px;padding:24px;">
      <p style="margin:0 0 12px;font-size:14px;color:#666;">Would you have 10 minutes for a quick call?</p>
      <a href="mailto:patrick@metroassoc.com?subject=Re: {{role}} opportunity"
         style="display:inline-block;background:#e63946;color:#fff;font-size:13px;font-weight:700;padding:12px 28px;border-radius:50px;text-decoration:none;letter-spacing:0.3px;">
        Reply to Connect
      </a>
    </td>
  </tr>
</table>

<p style="margin:0 0 16px;">No pressure at all — I appreciate your time either way.</p>

<p style="margin:0;">Best,</p>
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9f9f9;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 12px 12px;padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#1a1a2e;">Patrick Novick</p>
                    <p style="margin:0 0 2px;font-size:12px;color:#666;">Senior Recruiter — Metro Associates</p>
                    <p style="margin:0;font-size:12px;color:#999;">
                      <a href="mailto:patrick@metroassoc.com" style="color:#e63946;text-decoration:none;">patrick@metroassoc.com</a>
                      &nbsp;·&nbsp;+1 (239) 255-5921
                    </p>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <p style="margin:0;font-size:11px;color:#bbb;line-height:1.5;">
                      Metro Associates<br/>
                      <a href="https://patricknovick.com" style="color:#bbb;text-decoration:none;">patricknovick.com</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:16px;border-top:1px solid #e8e8e8;margin-top:16px;">
                    <p style="margin:0;font-size:10px;color:#bbb;line-height:1.5;">
                      You are receiving this because you are a professional in our network.
                      If you''d prefer not to receive future emails, simply reply with "unsubscribe."
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>', 2, 'sent', '<202605261358.84515327352@smtp-relay.mailin.fr>', 1779803933, NULL, NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (6, 'Following up — {{role}} opportunity', '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Metro Associates</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:''Helvetica Neue'',Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">Quick follow-up on the role — no pressure, just checking in.</div>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:#1a1a2e;border-radius:12px 12px 0 0;padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Metro</span>
                    <span style="font-size:20px;font-weight:800;color:#e63946;">.</span>
                    <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Associates</span>
                  </td>
                  <td align="right">
                    <span style="font-size:11px;color:rgba(255,255,255,0.4);font-weight:500;letter-spacing:1px;text-transform:uppercase;">Executive Recruiting</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
              <div style="font-size:15px;line-height:1.75;color:#1a1a2e;">
                
<p style="margin:0 0 20px;font-size:15px;color:#1a1a2e;">Hi {{first_name}},</p>

<p style="margin:0 0 16px;">I wanted to follow up on my previous message regarding the <strong style="color:#1a1a2e;">{{role}}</strong> opportunity.</p>

<p style="margin:0 0 16px;">I completely understand you''re busy — I just wanted to make sure my note didn''t get buried. Even if the timing isn''t quite right, I''d genuinely love to keep you in mind for future roles.</p>

<!-- CTA box -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
  <tr>
    <td align="center" style="background:#f9f9f9;border-radius:8px;padding:24px;">
      <p style="margin:0 0 12px;font-size:14px;color:#666;">Would you have 10 minutes for a quick call?</p>
      <a href="mailto:patrick@metroassoc.com?subject=Re: {{role}} opportunity"
         style="display:inline-block;background:#e63946;color:#fff;font-size:13px;font-weight:700;padding:12px 28px;border-radius:50px;text-decoration:none;letter-spacing:0.3px;">
        Reply to Connect
      </a>
    </td>
  </tr>
</table>

<p style="margin:0 0 16px;">No pressure at all — I appreciate your time either way.</p>

<p style="margin:0;">Best,</p>
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9f9f9;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 12px 12px;padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#1a1a2e;">Patrick Novick</p>
                    <p style="margin:0 0 2px;font-size:12px;color:#666;">Senior Recruiter — Metro Associates</p>
                    <p style="margin:0;font-size:12px;color:#999;">
                      <a href="mailto:patrick@metroassoc.com" style="color:#e63946;text-decoration:none;">patrick@metroassoc.com</a>
                      &nbsp;·&nbsp;+1 (239) 255-5921
                    </p>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <p style="margin:0;font-size:11px;color:#bbb;line-height:1.5;">
                      Metro Associates<br/>
                      <a href="https://patricknovick.com" style="color:#bbb;text-decoration:none;">patricknovick.com</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:16px;border-top:1px solid #e8e8e8;margin-top:16px;">
                    <p style="margin:0;font-size:10px;color:#bbb;line-height:1.5;">
                      You are receiving this because you are a professional in our network.
                      If you''d prefer not to receive future emails, simply reply with "unsubscribe."
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>', 2, 'sent', '<202605261401.60124131770@smtp-relay.mailin.fr>', 1779804067, NULL, NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (7, 'Exciting Opportunity — {{role}} at {{company}}', '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Metro Associates</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:''Helvetica Neue'',Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">New opportunity — {{role}} at {{company}} — confidential conversation welcome.</div>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:#1a1a2e;border-radius:12px 12px 0 0;padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Metro</span>
                    <span style="font-size:20px;font-weight:800;color:#e63946;">.</span>
                    <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Associates</span>
                  </td>
                  <td align="right">
                    <span style="font-size:11px;color:rgba(255,255,255,0.4);font-weight:500;letter-spacing:1px;text-transform:uppercase;">Executive Recruiting</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
              <div style="font-size:15px;line-height:1.75;color:#1a1a2e;">
                
<p style="margin:0 0 20px;font-size:15px;color:#1a1a2e;">Hi {{first_name}},</p>

<p style="margin:0 0 16px;">I hope you''re doing well. I came across your profile and immediately thought of an exciting opportunity that aligns with your background.</p>

<p style="margin:0 0 16px;">I''m recruiting for a <strong style="color:#1a1a2e;">{{role}}</strong> at <strong style="color:#1a1a2e;">{{company}}</strong> — a respected firm in the {{industry}} space.</p>

<!-- Highlight box -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
  <tr>
    <td style="background:#fff8f8;border-left:4px solid #e63946;border-radius:0 8px 8px 0;padding:16px 20px;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#e63946;text-transform:uppercase;letter-spacing:0.5px;">What''s on offer</p>
      <ul style="margin:0;padding-left:18px;color:#333;font-size:14px;line-height:1.8;">
        <li>Competitive compensation — {{compensation}}</li>
        <li>Location: {{location}}</li>
        <li>Strong growth trajectory</li>
        <li>Collaborative, high-performing team</li>
      </ul>
    </td>
  </tr>
</table>

<p style="margin:0 0 16px;">If you''re open to a confidential conversation, I''d love to connect — just reply to this email or give me a call.</p>

<p style="margin:0;">Best regards,</p>
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9f9f9;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 12px 12px;padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#1a1a2e;">Patrick Novick</p>
                    <p style="margin:0 0 2px;font-size:12px;color:#666;">Senior Recruiter — Metro Associates</p>
                    <p style="margin:0;font-size:12px;color:#999;">
                      <a href="mailto:patrick@metroassoc.com" style="color:#e63946;text-decoration:none;">patrick@metroassoc.com</a>
                      &nbsp;·&nbsp;+1 (239) 255-5921
                    </p>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <p style="margin:0;font-size:11px;color:#bbb;line-height:1.5;">
                      Metro Associates<br/>
                      <a href="https://patricknovick.com" style="color:#bbb;text-decoration:none;">patricknovick.com</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:16px;border-top:1px solid #e8e8e8;margin-top:16px;">
                    <p style="margin:0;font-size:10px;color:#bbb;line-height:1.5;">
                      You are receiving this because you are a professional in our network.
                      If you''d prefer not to receive future emails, simply reply with "unsubscribe."
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>', 1, 'sent', '<202605261404.61523118199@smtp-relay.mailin.fr>', 1779804258, NULL, NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (8, 'Following up — {{role}} opportunity', '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Metro Associates</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:''Helvetica Neue'',Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">Quick follow-up on the role — no pressure, just checking in.</div>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:#1a1a2e;border-radius:12px 12px 0 0;padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Metro</span>
                    <span style="font-size:20px;font-weight:800;color:#e63946;">.</span>
                    <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Associates</span>
                  </td>
                  <td align="right">
                    <span style="font-size:11px;color:rgba(255,255,255,0.4);font-weight:500;letter-spacing:1px;text-transform:uppercase;">Executive Recruiting</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
              <div style="font-size:15px;line-height:1.75;color:#1a1a2e;">
                
<p style="margin:0 0 20px;font-size:15px;color:#1a1a2e;">Hi {{first_name}},</p>

<p style="margin:0 0 16px;">I wanted to follow up on my previous message regarding the <strong style="color:#1a1a2e;">{{role}}</strong> opportunity.</p>

<p style="margin:0 0 16px;">I completely understand you''re busy — I just wanted to make sure my note didn''t get buried. Even if the timing isn''t quite right, I''d genuinely love to keep you in mind for future roles.</p>

<!-- CTA box -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
  <tr>
    <td align="center" style="background:#f9f9f9;border-radius:8px;padding:24px;">
      <p style="margin:0 0 12px;font-size:14px;color:#666;">Would you have 10 minutes for a quick call?</p>
      <a href="mailto:patrick@metroassoc.com?subject=Re: {{role}} opportunity"
         style="display:inline-block;background:#e63946;color:#fff;font-size:13px;font-weight:700;padding:12px 28px;border-radius:50px;text-decoration:none;letter-spacing:0.3px;">
        Reply to Connect
      </a>
    </td>
  </tr>
</table>

<p style="margin:0 0 16px;">No pressure at all — I appreciate your time either way.</p>

<p style="margin:0;">Best,</p>
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9f9f9;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 12px 12px;padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#1a1a2e;">Patrick Novick</p>
                    <p style="margin:0 0 2px;font-size:12px;color:#666;">Senior Recruiter — Metro Associates</p>
                    <p style="margin:0;font-size:12px;color:#999;">
                      <a href="mailto:patrick@metroassoc.com" style="color:#e63946;text-decoration:none;">patrick@metroassoc.com</a>
                      &nbsp;·&nbsp;+1 (239) 255-5921
                    </p>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <p style="margin:0;font-size:11px;color:#bbb;line-height:1.5;">
                      Metro Associates<br/>
                      <a href="https://patricknovick.com" style="color:#bbb;text-decoration:none;">patricknovick.com</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:16px;border-top:1px solid #e8e8e8;margin-top:16px;">
                    <p style="margin:0;font-size:10px;color:#bbb;line-height:1.5;">
                      You are receiving this because you are a professional in our network.
                      If you''d prefer not to receive future emails, simply reply with "unsubscribe."
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>', 1, 'sent', '<202605261405.38804275897@smtp-relay.mailin.fr>', 1779804311, NULL, NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (9, 'Following up — {{role}} opportunity', '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Metro Associates</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:''Helvetica Neue'',Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">Quick follow-up on the {{role}} role — no pressure, just checking in.</div>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:#1a1a2e;border-radius:12px 12px 0 0;padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Metro</span>
                    <span style="font-size:20px;font-weight:800;color:#e63946;">.</span>
                    <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Associates</span>
                  </td>
                  <td align="right">
                    <span style="font-size:11px;color:rgba(255,255,255,0.4);font-weight:500;letter-spacing:1px;text-transform:uppercase;">Executive Recruiting</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
              <div style="font-size:15px;line-height:1.75;color:#1a1a2e;">
                
<p style="margin:0 0 20px;font-size:15px;color:#1a1a2e;">Hi {{first_name}},</p>

<p style="margin:0 0 16px;">I wanted to follow up on my previous message regarding the <strong style="color:#1a1a2e;">{{role}}</strong> opportunity.</p>

<p style="margin:0 0 16px;">I completely understand you''re busy — I just wanted to make sure my note didn''t get buried. Even if the timing isn''t quite right, I''d genuinely love to keep you in mind for future roles.</p>

<!-- CTA box -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
  <tr>
    <td align="center" style="background:#f9f9f9;border-radius:8px;padding:24px;">
      <p style="margin:0 0 12px;font-size:14px;color:#666;">Would you have 10 minutes for a quick call?</p>
      <a href="mailto:patrick@metroassoc.com?subject=Re: {{role}} opportunity"
         style="display:inline-block;background:#e63946;color:#fff;font-size:13px;font-weight:700;padding:12px 28px;border-radius:50px;text-decoration:none;letter-spacing:0.3px;">
        Reply to Connect
      </a>
    </td>
  </tr>
</table>

<p style="margin:0 0 16px;">No pressure at all — I appreciate your time either way.</p>

<p style="margin:0;">Best,</p>
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9f9f9;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 12px 12px;padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#1a1a2e;">Patrick Novick</p>
                    <p style="margin:0 0 2px;font-size:12px;color:#666;">Senior Recruiter — Metro Associates</p>
                    <p style="margin:0;font-size:12px;color:#999;">
                      <a href="mailto:patrick@metroassoc.com" style="color:#e63946;text-decoration:none;">patrick@metroassoc.com</a>
                      &nbsp;·&nbsp;+1 (239) 255-5921
                    </p>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <p style="margin:0;font-size:11px;color:#bbb;line-height:1.5;">
                      Metro Associates<br/>
                      <a href="https://patricknovick.com" style="color:#bbb;text-decoration:none;">patricknovick.com</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:16px;border-top:1px solid #e8e8e8;margin-top:16px;">
                    <p style="margin:0;font-size:10px;color:#bbb;line-height:1.5;">
                      You are receiving this because you are a professional in our network.
                      If you''d prefer not to receive future emails, simply reply with "unsubscribe."
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>', 2, 'sent', '<202605261405.24141945364@smtp-relay.mailin.fr>', 1779804355, NULL, NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (10, 'Exciting Opportunity — {{role}} at {{company}}', 'Hi {{first_name}},

I hope you''re doing well. I came across your profile and immediately thought of an exciting opportunity that aligns with your background.

I''m recruiting for a at  a respected firm in the  space.

What''s on offer:
- Competitive compensation: 
- Location: {{location}}
- Strong growth trajectory
- Collaborative, high-performing team

If you''re open to a confidential conversation, I''d love to connect — just reply to this email or give me a call.

Best regards,

--
Patrick Novick
Senior Recruiter — Metro Associates
patrick@metroassoc.com | +1 (239) 255-5921
patricknovick.com', 2, 'sent', '<202605261427.99477981624@smtp-relay.mailin.fr>', 1779805652, NULL, NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (11, 'Following up — {{role}} opportunity', 'Hi {{first_name}},

I wanted to follow up on my previous message regarding the opportunity.

I completely understand you''re busy — I just wanted to make sure my note didn''t get buried. Even if the timing isn''t quite right, I''d genuinely love to keep you in mind for future roles.

Would you have 10 minutes for a quick call? Just reply to this email and we''ll find a time.

No pressure at all I appreciate your time either way.

Best,

--
Patrick Novick
Senior Recruiter — Metro Associates
patrick@metroassoc.com | +1 (239) 255-5921
patricknovick.com', 2, 'sent', '<202605261428.41911962419@smtp-relay.mailin.fr>', 1779805686, NULL, NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (12, 'Following up — {{role}} opportunity', 'Hi {{first_name}},

I wanted to follow up on my previous message regarding the {{role}} opportunity.

I completely understand you''re busy — I just wanted to make sure my note didn''t get buried. Even if the timing isn''t quite right, I''d genuinely love to keep you in mind for future roles.

Would you have 10 minutes for a quick call? Just reply to this email and we''ll find a time.

No pressure at all — I appreciate your time either way.

Best,

--
Patrick Novick
Senior Recruiter — Metro Associates
patrick@metroassoc.com | +1 (239) 255-5921
patricknovick.com', 2, 'sent', '<202605261514.14448175441@smtp-relay.mailin.fr>', 1779808445, NULL, NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (13, 'Exciting Opportunity — {{role}} at {{company}}', 'Hi {{first_name}},

I hope you''re doing well. I came across your profile and immediately thought of an exciting opportunity that aligns with your background.

I''m recruiting for a {{role}} at {{company}} — a respected firm in the {{industry}} space.

What''s on offer:
- Competitive compensation: {{compensation}}
- Location: {{location}}
- Strong growth trajectory
- Collaborative, high-performing team

If you''re open to a confidential conversation, I''d love to connect — just reply to this email or give me a call.

Best regards,

--
Patrick Novick
Senior Recruiter — Metro Associates
patrick@metroassoc.com | +1 (239) 255-5921
patricknovick.com', 2, 'sent', '<202605261514.93898966628@smtp-relay.mailin.fr>', 1779808468, NULL, NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (14, 'Following up — {{role}} opportunity', 'Hi {{first_name}},

I wanted to follow up on my previous message regarding the {{role}} opportunity.

I completely understand you''re busy — I just wanted to make sure my note didn''t get buried. Even if the timing isn''t quite right, I''d genuinely love to keep you in mind for future roles.

Would you have 10 minutes for a quick call? Just reply to this email and we''ll find a time.

No pressure at all — I appreciate your time either way.

Best,

--
Patrick Novick
Senior Recruiter — Metro Associates
patrick@metroassoc.com | +1 (239) 255-5921
patricknovick.com', 2, 'sent', '<202606011036.95837337917@smtp-relay.mailin.fr>', 1780310173, NULL, NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (15, 'Re: following up', 'Hi {{first_name}},

Just wanted to make sure my last note didn''t get buried. Totally understand if the timing isn''t right — I just wanted to check in before moving on.

If you''re open to a quick chat, just reply and we''ll find a time that works.

Best,

--
Patrick Novick
Senior Recruiter — Metro Associates
patrick@metroassoc.com | +1 (239) 255-5921', 2, 'sent', '<202606011100.36884567835@smtp-relay.mailin.fr>', 1780311603, NULL, NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (16, 'Re: following up', 'Hi {{first_name}},

Just wanted to make sure my last note didn''t get buried. Totally understand if the timing isn''t right — I just wanted to check in before moving on.

If you''re open to a quick chat, just reply and we''ll find a time that works.

Best,

--
Patrick Novick
Senior Recruiter — Metro Associates
patrick@metroassoc.com | +1 (239) 255-5921', 2, 'sent', '<202606011101.31611176085@smtp-relay.mailin.fr>', 1780311704, NULL, NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (17, 'Re: following up', 'Hi {{first_name}},

Just wanted to make sure my last note didn''t get buried. Totally understand if the timing isn''t right — I just wanted to check in before moving on.

If you''re open to a quick chat, just reply and we''ll find a time that works.

Best,

--
Patrick Novick
Senior Recruiter — Metro Associates
patrick@metroassoc.com | +1 (239) 255-5921', 2, 'sent', '<202606021705.85815105955@smtp-relay.mailin.fr>', 1780419948, NULL, NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (18, 'quick question', 'Hi {{first_name}},

Came across your background and wanted to reach out. I''m a recruiter working on a senior engineering search in the US — based on your experience I thought it might be worth a quick conversation.

Would you be open to a 10-minute call this week?


Patrick
(239) 255-5921', 2, 'sent', '<202606031642.63576123793@smtp-relay.mailin.fr>', 1780504945, NULL, NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (19, 'engineering hiring in Connecticut', 'Hi {{first_name}},

I work with Metro Associates placing civil, transportation, structural, and inspection engineers throughout Connecticut. Over the past year we have placed professionals on CTDOT projects, bridge rehab work, and water and wastewater infrastructure.

If your team anticipates any hiring in the next 30 to 90 days — even for hard-to-fill roles — I would be glad to share what we are seeing in the market.

Worth a quick call?


Patrick
(239) 255-5921', 2, 'sent', '<202606101234.58670664451@smtp-relay.mailin.fr>', 1781094886, 'test list', NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (20, 'engineering hiring in Connecticut', 'Hi {{first_name}},

I work with Metro Associates placing civil, transportation, structural, and inspection engineers throughout Connecticut. Over the past year we have placed professionals on CTDOT projects, bridge rehab work, and water and wastewater infrastructure.

If your team anticipates any hiring in the next 30 to 90 days — even for hard-to-fill roles — I would be glad to share what we are seeing in the market.

Worth a quick call?


Patrick
(239) 255-5921', 3, 'sent', '<202606111612.37663098501@smtp-relay.mailin.fr>', 1781194347, 'test list', NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (21, 'engineering hiring in Connecticut', 'Hi {{first_name}},

I work with Metro Associates placing civil, transportation, structural, and inspection engineers throughout Connecticut. Over the past year we have placed professionals on CTDOT projects, bridge rehab work, and water and wastewater infrastructure.

If your team anticipates any hiring in the next 30 to 90 days — even for hard-to-fill roles — I would be glad to share what we are seeing in the market.

Worth a quick call?


Patrick
(239) 255-5921', 4, 'sent', '<202606111655.26349027678@smtp-relay.mailin.fr>', 1781196912, 'test list', NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (22, 'engineering hiring in Connecticut', 'Hi {{first_name}},

I work with Metro Associates placing civil, transportation, structural, and inspection engineers throughout Connecticut. Over the past year we have placed professionals on CTDOT projects, bridge rehab work, and water and wastewater infrastructure.

If your team anticipates any hiring in the next 30 to 90 days — even for hard-to-fill roles — I would be glad to share what we are seeing in the market.

Worth a quick call?


Patrick
(239) 255-5921', 4, 'sent', '<202606111700.85929336019@smtp-relay.mailin.fr>', 1781197241, 'test list', NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (23, 'engineering hiring in Connecticut', 'Hi {{first_name}},

I work with Metro Associates placing civil, transportation, structural, and inspection engineers throughout Connecticut. Over the past year we have placed professionals on CTDOT projects, bridge rehab work, and water and wastewater infrastructure.

If your team anticipates any hiring in the next 30 to 90 days — even for hard-to-fill roles — I would be glad to share what we are seeing in the market.

Worth a quick call?


Patrick
(239) 255-5921', 3, 'sent', '<202606121625.60813609676@smtp-relay.mailin.fr>', 1781281501, 'test list', NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (24, 'engineering hiring in Connecticut', 'Hi {{first_name}},

I work with Metro Associates placing civil, transportation, structural, and inspection engineers throughout Connecticut. Over the past year we have placed professionals on CTDOT projects, bridge rehab work, and water and wastewater infrastructure.

If your team anticipates any hiring in the next 30 to 90 days — even for hard-to-fill roles — I would be glad to share what we are seeing in the market.

Worth a quick call?


Patrick
(239) 255-5921', 1, 'sent', '<202606151338.89765544295@smtp-relay.mailin.fr>', 1781530730, 'test list', NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (25, 'engineering hiring in Connecticut', 'Hi {{first_name}},

I work with Metro Associates placing civil, transportation, structural, and inspection engineers throughout Connecticut. Over the past year we have placed professionals on CTDOT projects, bridge rehab work, and water and wastewater infrastructure.

If your team anticipates any hiring in the next 30 to 90 days — even for hard-to-fill roles — I would be glad to share what we are seeing in the market.

Worth a quick call?


Patrick
(239) 255-5921', 2, 'sent', '<202606151346.48702999681@smtp-relay.mailin.fr>', 1781531191, 'test list', NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (26, 'engineering hiring in Connecticut', 'Hi {{first_name}},

I work with Metro Associates placing civil, transportation, structural, and inspection engineers throughout Connecticut. Over the past year we have placed professionals on CTDOT projects, bridge rehab work, and water and wastewater infrastructure.

If your team anticipates any hiring in the next 30 to 90 days — even for hard-to-fill roles — I would be glad to share what we are seeing in the market.

Worth a quick call?


Patrick
(239) 255-5921', 4, 'sent', '<202606151351.44422171722@smtp-relay.mailin.fr>', 1781531462, 'test list', NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (27, 'engineering hiring in Connecticut', 'Hi {{first_name}},

I work with Metro Associates placing civil, transportation, structural, and inspection engineers throughout Connecticut. Over the past year we have placed professionals on CTDOT projects, bridge rehab work, and water and wastewater infrastructure.

If your team anticipates any hiring in the next 30 to 90 days — even for hard-to-fill roles — I would be glad to share what we are seeing in the market.

Worth a quick call?


Patrick
(239) 255-5921', 0, 'failed', NULL, 1781612454, 'test list', NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (28, 'engineering hiring in Connecticut', 'Hi {{first_name}},

I work with Metro Associates placing civil, transportation, structural, and inspection engineers throughout Connecticut. Over the past year we have placed professionals on CTDOT projects, bridge rehab work, and water and wastewater infrastructure.

If your team anticipates any hiring in the next 30 to 90 days — even for hard-to-fill roles — I would be glad to share what we are seeing in the market.

Worth a quick call?


Patrick
(239) 255-5921', 2, 'sent', '<202606161221.96484487353@smtp-relay.mailin.fr>', 1781612490, 'test list', NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (29, 'engineering hiring in Connecticut', 'Hi {{first_name}},

I work with Metro Associates placing civil, transportation, structural, and inspection engineers throughout Connecticut. Over the past year we have placed professionals on CTDOT projects, bridge rehab work, and water and wastewater infrastructure.

If your team anticipates any hiring in the next 30 to 90 days — even for hard-to-fill roles — I would be glad to share what we are seeing in the market.

Worth a quick call?


Patrick
(239) 255-5921', 0, 'failed', NULL, 1781614017, 'Campain: 1', NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (30, 'engineering hiring in Connecticut', 'Hi {{first_name}},

I work with Metro Associates placing civil, transportation, structural, and inspection engineers throughout Connecticut. Over the past year we have placed professionals on CTDOT projects, bridge rehab work, and water and wastewater infrastructure.

If your team anticipates any hiring in the next 30 to 90 days — even for hard-to-fill roles — I would be glad to share what we are seeing in the market.

Worth a quick call?


Patrick
(239) 255-5921', 10, 'sent', '<202606161247.31982042355@smtp-relay.mailin.fr>', 1781614069, 'Campain: 1', NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (31, 'engineering hiring in Connecticut', 'Hi {{first_name}},

I work with Metro Associates placing civil, transportation, structural, and inspection engineers throughout Connecticut. Over the past year we have placed professionals on CTDOT projects, bridge rehab work, and water and wastewater infrastructure.

If your team anticipates any hiring in the next 30 to 90 days — even for hard-to-fill roles — I would be glad to share what we are seeing in the market.

Worth a quick call?


Patrick
(239) 255-5921', 0, 'failed', NULL, 1781618957, 't1', NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (32, 'engineering hiring in Connecticut', 'Hi {{first_name}},

I work with Metro Associates placing civil, transportation, structural, and inspection engineers throughout Connecticut. Over the past year we have placed professionals on CTDOT projects, bridge rehab work, and water and wastewater infrastructure.

If your team anticipates any hiring in the next 30 to 90 days — even for hard-to-fill roles — I would be glad to share what we are seeing in the market.

Worth a quick call?


Patrick
(239) 255-5921', 1, 'sent', '<202606161410.51189706560@smtp-relay.mailin.fr>', 1781619013, 't1', NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (34, 'engineering hiring in Connecticut', 'Hi {{first_name}},

I work with Metro Associates placing civil, transportation, structural, and inspection engineers throughout Connecticut. Over the past year we have placed professionals on CTDOT projects, bridge rehab work, and water and wastewater infrastructure.

If your team anticipates any hiring in the next 30 to 90 days — even for hard-to-fill roles — I would be glad to share what we are seeing in the market.

Worth a quick call?


Patrick
(239) 255-5921', 20, 'sent', '<202606171426.20723681437@smtp-relay.mailin.fr>', 1781706398, 'Campain: 2', NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (36, 'engineering hiring in Connecticut', 'Hi {{first_name}},

I work with Metro Associates placing civil, transportation, structural, and inspection engineers throughout Connecticut. Over the past year we have placed professionals on CTDOT projects, bridge rehab work, and water and wastewater infrastructure.

If your team anticipates any hiring in the next 30 to 90 days — even for hard-to-fill roles — I would be glad to share what we are seeing in the market.

Worth a quick call?


Patrick
(239) 255-5921', 2, 'sent', '<202606171658.54206166266@smtp-relay.mailin.fr>', 1781715496, 'test list', NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (39, 'engineering hiring in Connecticut', 'Hi {{first_name}},

I work with Metro Associates placing civil, transportation, structural, and inspection engineers throughout Connecticut. Over the past year we have placed professionals on CTDOT projects, bridge rehab work, and water and wastewater infrastructure.

If your team anticipates any hiring in the next 30 to 90 days — even for hard-to-fill roles — I would be glad to share what we are seeing in the market.

Worth a quick call?


Patrick
(239) 255-5921', 30, 'sent', '<202606181012.81265484969@smtp-relay.mailin.fr>', 1781777566, 'campain:3', NULL);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (41, 'CONFIDENTIAL CANDIDATE WRITE-UP', 'Hi, {{first_name}}

Chief Bridge Inspector / P.E.

We are pleased to present a highly experienced Professional Engineer (P.E.) with 26 years of progressive engineering, construction management, and infrastructure leadership experience. This candidate brings a strong background in bridge inspection, transportation infrastructure, rail, utilities, QA/QC, design management, contract administration, and multidisciplinary project coordination.

The candidate has successfully supported and led complex public infrastructure programs involving major bridge replacement, bridge rehabilitation, transportation corridor improvements, rail infrastructure, civil/site improvements, environmental coordination, and construction-phase engineering support. Their experience includes working closely with public agencies, contractors, consultants, engineers, and stakeholders to keep projects moving from planning and design through construction and completion.

A major strength of this candidate is their ability to manage both the technical engineering side and the field/construction coordination side of infrastructure projects. They have served in leadership roles overseeing quality assurance and quality control, reviewing engineering deliverables, coordinating multiple disciplines, supporting design teams during construction, and ensuring that project work aligns with required standards and project requirements.

This candidate’s background includes direct experience with bridge engineering, bridge rehabilitation and replacement programs, transportation facility improvements, highway/interchange projects, rail engineering programs, emergency infrastructure stabilization, and statewide bridge inspection/asset management programs. Their leadership experience also includes managing civil, structural, electrical, communications, survey, subsurface investigation, environmental, and construction management activities.

Key strengths include:

• Professional Engineer (P.E.) background
• 26 years of progressive infrastructure and engineering experience
• Chief Bridge Inspector / bridge inspection leadership experience
• Strong bridge, transportation, rail, and civil infrastructure background
• QA/QC management and construction inspection oversight
• Design management and design services during construction
• Public agency, contractor, and stakeholder coordination
• Contract administration and project delivery experience
• Multidisciplinary engineering team leadership
• Strong ability to manage complex public-sector infrastructure projects

Overall, this candidate appears to be a strong fit for a Chief Bridge Inspector, Senior Bridge Inspection, Construction Management, Transportation Infrastructure, or P.E.-level project leadership role. Their combination of technical engineering knowledge, field coordination, QA/QC oversight, and executive-level project management experience makes them well suited for complex DOT, bridge, transportation, and infrastructure assignments.

Please review this confidential candidate profile and let us know if you would like to move forward with a conversation. Please advise on next steps.

Patrick Novick', 25, 'sent', '<202606291432.65203553473@smtp-relay.mailin.fr>', 1782743553, 'RI DOT', 11);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (42, 'Confidential Candidate for CT Bridge / Infrastructure Review – Please Advise', 'Hi {{first_name}}

Good afternoon,

I am presenting the attached confidential candidate profile for your review and advice regarding any current or upcoming Connecticut transportation, bridge, infrastructure, or CTDOT-related needs.

This candidate is a Professional Engineer / Chief Bridge Inspector with 26 years of progressive engineering, construction management, bridge, transportation, rail, infrastructure, QA/QC, design coordination, and public agency project experience. Their background includes managing complex bridge replacement, rehabilitation, transportation corridor, rail, highway, utility, environmental, and infrastructure programs.

Key areas of strength include:

Bridge Inspection / Bridge Engineering
Construction Management and QA/QC
Transportation and Rail Infrastructure
Design Review and Design Services During Construction
Public Agency Coordination
Contract Administration and Stakeholder Management
Multidisciplinary Engineering Team Leadership
Infrastructure Planning, Risk Management, and Project Delivery

Based on the scope of the candidate’s experience, I would appreciate your feedback on whether this individual may be a fit for any Chief Inspector, Bridge Inspector, Project Manager, Construction Management, Design Coordination, QA/QC, or senior transportation infrastructure role in Connecticut.

Please review and advise on:

Whether this background fits any current CT needs.
Whether the candidate should be considered for upcoming CTDOT bridge or infrastructure work.
Which manager or project group would be the best fit for review.
Whether you would like me to arrange a call or provide additional details.

Thank you, and I look forward to your guidance.

Patrick Novick
Metro Assoc
239-255-5921', 59, 'sent', '<202606301432.46899725372@smtp-relay.mailin.fr>', 1782829943, 'CT DOT', 15);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (43, 'NYC MEP / HVAC PE Candidate for Review — Please Advise', 'Hi {{first_name}},

I wanted to present this confidential NYC MEP / HVAC candidate for your review and guidance regarding any current or upcoming Mechanical Engineering, HVAC Design, MEP Coordination, commercial, retail, restaurant, banking, dealership, or NYC building systems needs.

This candidate is a Mechanical Engineer / HVAC Designer with strong experience supporting commercial, retail, restaurant, banking, dealership, and high-end Manhattan project environments. His background includes HVAC design, load calculations, AutoCAD, MEP coordination, site surveys, construction coordination, field reporting, value engineering, punch lists, troubleshooting, and project closeout.

Key areas of strength include:

HVAC Design
MEP Coordination
Load Calculations
AutoCAD Design
Commercial / Retail / Restaurant Projects
NYC Site Surveys and Field Reporting
Construction Coordination
Value Engineering
Punch Lists and Project Closeout
Architect, Contractor, Vendor, and Client Coordination
English / Spanish Bilingual Communication

He has served as a mechanical lead on complex mechanical design projects involving high-end restaurants, retail stores, commercial banks, car dealerships, and other commercial facilities. He has also worked directly with general contractors, architects, mechanical contractors, electrical contractors, plumbing contractors, vendors, and clients to keep projects moving, address field issues, reduce costs, and deliver practical mechanical system solutions.

Based on this background, I would appreciate your advice on whether this candidate may be a fit for any NYC Mechanical Engineer, HVAC Designer, MEP Engineer, PE-level HVAC design support, construction administration, site survey, or commercial building systems role.

Please advise whether this background fits any current or upcoming NYC MEP / HVAC needs, and who would be the best manager or project group to review him.

Thank you, and I look forward to your guidance.

Patrick Novick 
Metro Assoc
239-255-5921', 50, 'sent', '<202606301439.34282170354@smtp-relay.mailin.fr>', 1782830341, 'MEP list', 9);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (44, 'hi', 'hi', 1, 'sent', '<202607011425.22251890668@smtp-relay.mailin.fr>', 1782915924, 'Test List SAMPLE', 2);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (45, 'NYC MEP / HVAC PE Candidate for Review — Please Advise', 'Hi {{first_name}},

I wanted to present this confidential NYC MEP / HVAC candidate for your review and guidance regarding any current or upcoming Mechanical Engineering, HVAC Design, MEP Coordination, commercial, retail, restaurant, banking, dealership, or NYC building systems needs.

This candidate is a Mechanical Engineer / HVAC Designer with strong experience supporting commercial, retail, restaurant, banking, dealership, and high-end Manhattan project environments. His background includes HVAC design, load calculations, AutoCAD, MEP coordination, site surveys, construction coordination, field reporting, value engineering, punch lists, troubleshooting, and project closeout.

Key areas of strength include:

HVAC Design
MEP Coordination
Load Calculations
AutoCAD Design
Commercial / Retail / Restaurant Projects
NYC Site Surveys and Field Reporting
Construction Coordination
Value Engineering
Punch Lists and Project Closeout
Architect, Contractor, Vendor, and Client Coordination
English / Spanish Bilingual Communication

He has served as a mechanical lead on complex mechanical design projects involving high-end restaurants, retail stores, commercial banks, car dealerships, and other commercial facilities. He has also worked directly with general contractors, architects, mechanical contractors, electrical contractors, plumbing contractors, vendors, and clients to keep projects moving, address field issues, reduce costs, and deliver practical mechanical system solutions.

Based on this background, I would appreciate your advice on whether this candidate may be a fit for any NYC Mechanical Engineer, HVAC Designer, MEP Engineer, PE-level HVAC design support, construction administration, site survey, or commercial building systems role.

Please advise whether this background fits any current or upcoming NYC MEP / HVAC needs, and who would be the best manager or project group to review him.

Thank you, and I look forward to your guidance.

Patrick Novick 
Metro Assoc
239-255-5921', 75, 'sent', '<202607011430.54045221836@smtp-relay.mailin.fr>', 1782916198, 'MEP list', 9);
INSERT INTO "campaigns" ("id", "subject", "body", "recipient_count", "status", "brevo_msg_id", "sent_at", "target_list", "list_id") VALUES (46, 'CONFIDENTIAL CANDIDATE WRITE-UP', 'Hi, {{first_name}}

Chief Bridge Inspector / P.E.

We are pleased to present a highly experienced Professional Engineer (P.E.) with 26 years of progressive engineering, construction management, and infrastructure leadership experience. This candidate brings a strong background in bridge inspection, transportation infrastructure, rail, utilities, QA/QC, design management, contract administration, and multidisciplinary project coordination.

The candidate has successfully supported and led complex public infrastructure programs involving major bridge replacement, bridge rehabilitation, transportation corridor improvements, rail infrastructure, civil/site improvements, environmental coordination, and construction-phase engineering support. Their experience includes working closely with public agencies, contractors, consultants, engineers, and stakeholders to keep projects moving from planning and design through construction and completion.

A major strength of this candidate is their ability to manage both the technical engineering side and the field/construction coordination side of infrastructure projects. They have served in leadership roles overseeing quality assurance and quality control, reviewing engineering deliverables, coordinating multiple disciplines, supporting design teams during construction, and ensuring that project work aligns with required standards and project requirements.

This candidate’s background includes direct experience with bridge engineering, bridge rehabilitation and replacement programs, transportation facility improvements, highway/interchange projects, rail engineering programs, emergency infrastructure stabilization, and statewide bridge inspection/asset management programs. Their leadership experience also includes managing civil, structural, electrical, communications, survey, subsurface investigation, environmental, and construction management activities.

Key strengths include:

• Professional Engineer (P.E.) background
• 26 years of progressive infrastructure and engineering experience
• Chief Bridge Inspector / bridge inspection leadership experience
• Strong bridge, transportation, rail, and civil infrastructure background
• QA/QC management and construction inspection oversight
• Design management and design services during construction
• Public agency, contractor, and stakeholder coordination
• Contract administration and project delivery experience
• Multidisciplinary engineering team leadership
• Strong ability to manage complex public-sector infrastructure projects

Overall, this candidate appears to be a strong fit for a Chief Bridge Inspector, Senior Bridge Inspection, Construction Management, Transportation Infrastructure, or P.E.-level project leadership role. Their combination of technical engineering knowledge, field coordination, QA/QC oversight, and executive-level project management experience makes them well suited for complex DOT, bridge, transportation, and infrastructure assignments.

Please review this confidential candidate profile and let us know if you would like to move forward with a conversation. Please advise on next steps.', 50, 'sent', '<202607011431.35643015917@smtp-relay.mailin.fr>', 1782916287, 'RI DOT', 11);

-- ---------- table: contact_list_members ----------
DROP TABLE IF EXISTS "contact_list_members";
CREATE TABLE contact_list_members (
    list_id    INTEGER NOT NULL,
    contact_id INTEGER NOT NULL,
    PRIMARY KEY (list_id, contact_id)
  );
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (2, 102);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 386);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 387);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 388);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 389);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 390);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 391);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 392);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 393);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 394);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 395);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 396);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 397);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 398);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 399);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 400);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 401);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 402);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 403);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 404);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 405);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 406);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 407);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 408);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 409);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 410);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 411);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 412);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 413);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 414);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 415);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 416);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 417);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 418);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 419);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 420);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 421);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 422);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 423);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 424);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 426);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 427);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 428);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 429);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 430);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 431);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 432);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 433);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 434);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 435);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 436);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 437);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 438);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 439);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 441);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 442);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 443);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 444);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 445);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 446);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 447);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 448);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 449);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 450);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 451);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 452);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 453);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 454);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 455);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 456);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 457);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 458);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 459);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 460);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 461);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 462);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 463);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 464);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 465);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 466);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 467);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 468);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 469);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 470);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 471);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 472);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 473);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 474);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 475);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 476);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 477);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 478);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 479);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 480);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 481);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 482);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 483);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 484);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 485);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 486);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 487);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 488);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 489);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 490);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 491);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 492);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 493);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 494);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 495);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 496);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 497);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 498);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 499);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 500);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 501);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 502);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 503);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 504);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 505);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 506);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 507);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 508);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 509);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 510);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 511);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 512);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 513);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 514);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 515);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 516);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 517);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 518);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 519);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 520);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 521);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 522);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 523);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 524);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 525);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 526);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 527);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 528);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 529);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 530);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 531);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 532);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 533);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 534);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 535);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 536);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 537);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 538);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 539);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 540);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 541);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 542);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 543);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 544);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 545);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 546);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 547);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 548);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 549);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 550);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 551);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 552);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 553);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 554);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 555);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 556);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 557);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 558);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 559);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 560);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 561);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 562);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 563);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 564);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 565);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 566);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 567);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 568);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 569);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 570);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 571);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 572);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 573);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 574);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 575);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 576);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 577);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 578);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 579);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 580);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 581);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 582);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 583);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 584);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 585);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 586);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 587);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 588);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 589);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 590);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 591);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 592);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 593);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 594);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 595);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 596);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 597);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 598);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 599);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 600);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 601);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 602);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 603);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 604);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 605);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 606);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 607);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 608);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 609);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 610);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 611);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 612);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 613);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 614);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 615);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 616);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 617);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 618);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 619);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 620);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 621);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 622);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 623);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 624);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 625);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 626);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 627);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 628);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 629);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 630);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 631);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 632);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 633);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 634);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 635);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 636);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 637);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 638);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 639);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 640);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 641);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 642);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 643);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 644);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 645);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 646);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 647);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 648);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 649);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 650);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 651);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 652);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 653);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 654);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 655);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 656);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 657);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 658);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 659);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 660);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 661);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 662);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 663);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 664);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 665);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 666);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 667);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 668);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 669);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 670);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 671);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 672);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 673);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 674);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 675);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 676);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 677);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 678);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 679);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 680);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 681);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 682);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 683);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 684);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 685);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 686);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 687);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 688);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 689);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 690);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 691);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 692);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 693);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 694);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 695);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 696);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 697);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 698);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 699);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 700);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 701);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 702);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 703);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 704);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 705);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 706);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 707);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 708);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 709);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 710);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 711);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 712);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 713);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 714);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 715);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 716);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 717);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 718);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 719);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 720);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 721);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 722);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 723);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 724);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 725);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 726);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 727);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 728);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 729);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 730);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 731);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 732);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 733);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 734);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 735);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 736);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 737);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 738);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 739);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 740);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 741);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 742);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 743);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 744);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 745);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 746);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 747);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 748);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 749);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 750);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 751);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 752);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 753);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 754);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 755);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 756);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 757);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 758);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 759);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 760);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 761);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 762);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 763);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 764);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 765);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 766);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 767);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 768);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 769);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 770);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 771);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 772);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 773);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 774);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 775);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 776);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 777);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 778);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 779);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 780);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 781);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 782);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 783);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 785);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 786);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 787);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 788);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 789);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 790);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 791);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 792);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 793);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 794);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 795);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 796);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 797);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 798);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 799);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 800);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 801);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 802);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 803);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 804);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 805);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 806);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 807);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 808);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 809);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 810);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 811);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 812);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 813);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 814);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 815);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 816);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 817);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 818);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 819);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 821);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 822);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 823);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 824);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 825);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 826);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 827);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 828);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 829);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 830);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 831);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 832);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 833);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 834);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 835);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 836);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 837);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 838);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 839);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 840);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 841);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 842);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 843);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 844);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 845);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 846);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 847);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (9, 848);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 935);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 938);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 939);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 940);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 941);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 942);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 943);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 944);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 945);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 946);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 947);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 948);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 949);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 950);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 951);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 952);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 953);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 954);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 955);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 956);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 957);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 958);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 959);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 960);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 961);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 962);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 963);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 964);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 965);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 966);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 967);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 968);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 969);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 970);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 971);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 972);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 973);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 974);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 975);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 976);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 977);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 978);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 979);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 980);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 77);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 982);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 983);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 984);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 985);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 986);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 987);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 988);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 989);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 990);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 991);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 992);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 993);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 994);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 995);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 996);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 997);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 998);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 999);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1000);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1001);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1002);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1003);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1004);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1005);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1006);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1007);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1008);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1009);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1010);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1011);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1012);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1013);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1014);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1015);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1016);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1017);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1018);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1019);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1020);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1021);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1022);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1023);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 1024);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 106);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (11, 107);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 27);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 28);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 29);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 31);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 32);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 33);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 34);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 35);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 37);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 38);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 39);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 40);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 41);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 42);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 43);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 45);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 46);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 48);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 50);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 1532);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 53);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 54);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 55);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 57);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 1537);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 60);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 1539);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 1540);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 66);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 67);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 68);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 69);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 70);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 72);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 73);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 74);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 75);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 76);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 1552);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 79);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 80);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 81);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 82);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 83);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 84);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 85);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 86);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 87);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 88);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 89);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 1564);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 92);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 93);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 94);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 1568);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 97);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 98);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 100);
INSERT INTO "contact_list_members" ("list_id", "contact_id") VALUES (15, 101);

-- ---------- table: contact_lists ----------
DROP TABLE IF EXISTS "contact_lists";
CREATE TABLE contact_lists (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL UNIQUE,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  );
INSERT INTO "contact_lists" ("id", "name", "created_at") VALUES (2, 'Test List SAMPLE', 1781094566);
INSERT INTO "contact_lists" ("id", "name", "created_at") VALUES (9, 'MEP list', 1782235833);
INSERT INTO "contact_lists" ("id", "name", "created_at") VALUES (11, 'RI DOT', 1782394314);
INSERT INTO "contact_lists" ("id", "name", "created_at") VALUES (15, 'CT DOT', 1782826439);

-- ---------- table: contacts ----------
DROP TABLE IF EXISTS "contacts";
CREATE TABLE contacts (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    email      TEXT NOT NULL UNIQUE,
    name       TEXT NOT NULL DEFAULT '',
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  , status TEXT NOT NULL DEFAULT 'active', tags TEXT NOT NULL DEFAULT '', company TEXT NOT NULL DEFAULT '', title TEXT NOT NULL DEFAULT '', first_name TEXT NOT NULL DEFAULT '', last_name TEXT NOT NULL DEFAULT '', phone_2 TEXT NOT NULL DEFAULT '', city TEXT NOT NULL DEFAULT '', phone TEXT NOT NULL DEFAULT '', zip_code TEXT NOT NULL DEFAULT '', street_address TEXT NOT NULL DEFAULT '', state TEXT NOT NULL DEFAULT '', country TEXT NOT NULL DEFAULT 'US', segments TEXT NOT NULL DEFAULT '', notes TEXT NOT NULL DEFAULT '', custom_fields TEXT NOT NULL DEFAULT '{}', county TEXT NOT NULL DEFAULT '', email_2 TEXT NOT NULL DEFAULT '', business_email TEXT NOT NULL DEFAULT '', linkedin TEXT NOT NULL DEFAULT '', region TEXT NOT NULL DEFAULT '', website TEXT NOT NULL DEFAULT '', work_phone_2 TEXT NOT NULL DEFAULT '', personal_email_2 TEXT NOT NULL DEFAULT '', mobile_phone_2 TEXT NOT NULL DEFAULT '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (27, 'georges@adicesarepc.com', 'Julie Georges', 1781289350, 'active', '', 'A. DiCesare Associates, PC', '', 'Julie', 'Georges', '', 'Bridgeport', '(203)696-0444', '06604', '690 Clinton Avenue', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (28, 'michael.mccarthy@aecom.com', 'Michael McCarthy', 1781289350, 'active', '', 'AECOM Technical Services, Inc.', '', 'Michael', 'McCarthy', '', 'Rocky Hill', '(860)263-5757', '06067', '500 Enterprise Drive, Suite 3B', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (29, 'aislam@aiengineers.com', 'Abul Islam', 1781289351, 'active', '', 'AI Engineers, Inc.', '', 'Abul', 'Islam', '', 'Middletown', '(860)635-7740', '06457', '919 Middle Street', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (30, 'saslam@aiengineers.com', 'Abul Islam', 1781289351, 'active', '', '', '', '', '', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (31, 'sdrechsler@benesch.com', 'Steven Drechsler', 1781289351, 'active', '', 'Alfred Benesch & Company', '', 'Steven', 'Drechsler', '', 'Glastonbury', '(860)633-8341', '06033', '120 Hebron Avenue, 2nd Floor', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (32, 'fbalassone@ataneconsulting.com', 'Franco Balassone', 1781289351, 'active', '', 'ATANE Engineers, P.C.', '', 'Franco', 'Balassone', '', 'Wethersfield', '(860)761-1001ext 242', '06109', '100 Great Meadow Road, Suite 400', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (33, 'mzessin@bartonandloguidice.com', 'Mark M. Zessin', 1781289351, 'active', '', 'Barton & Loguidice, LLC', '', 'Mark', 'M. Zessin', '', 'Glastonbury', '(860)633-8770', '06033', '41 Sequin Drive', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (34, 'deepa@besinceng.com', 'Deepa Vaswani', 1781289351, 'active', '', 'Baslee Engineering Solutions, Inc.', '', 'Deepa', 'Vaswani', '', 'Rocky Hill', '917-412-0771', '06067', '175 Capital Boulevard, Suite 402', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (35, 'nhabesch@beta-inc.com', 'Najib O. Habesch', 1781289351, 'active', '', 'Beta Group, Inc.', '', 'Najib', 'O. Habesch', '', 'Hartford', '(860)513-1503 x7044', '06114', '1010 Wethersfield Avenue, Suite 305', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (36, 'acouture@beta-inc.com', 'Najib O. Habesch', 1781289352, 'active', '', '', '', '', '', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (37, 'ngiardina@blcompanies.com', 'Nicholas Giardina', 1781289352, 'active', '', 'BL Companies Connecticut, Inc.', '', 'Nicholas', 'Giardina', '', 'Meriden', '860-760-1921', '06450', '355 Research Parkway', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (38, 'cvany@cvassociatesny.com', 'C.V. Shashikumar', 1781289352, 'active', '', 'C.V. Associates NY; PE, LS, PC', '', 'C.V.', 'Shashikumar', '', 'Harriman', '(845)774-1075', '10926', '148 Route 17M, Suite 2', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (39, 'jac3@cardinal-engineering.com', 'Joseph Cermola', 1781289352, 'active', '', 'Cardinal Engineering Associates, Inc.', '', 'Joseph', 'Cermola', '', 'Meriden', '(203)238-1969', '06450', '180 Research parkway', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (40, 'scalisej@cdmsmith.com', 'Joseph Scalise', 1781289352, 'active', '', 'CDM Smith Inc.', '', 'Joseph', 'Scalise', '', 'East Hartford', '(860) 808-2318', '06108', '101 East River Drive, Suite 1A', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (41, 'rfaulkner@chasolutions.com', 'Robert J. Faulkner', 1781289352, 'active', '', 'CHA\Clough, Harbour & Associates, LLP', '', 'Robert', 'J. Faulkner', '', 'Rocky Hill', '(860)257-4557', '06067', '400 Capital Boulevard, Suite 301', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (42, 'slemoine@collinsengr.com', 'Seth Lemoine', 1781289352, 'active', '', 'Collins Engineers, Inc.', '', 'Seth', 'Lemoine', '', 'East Greenwich', '401-287-8800', '02818', '1485 S. County Trail,, Suite 103', 'RI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (43, 'kmcgaw@consoreng.com', 'Kelsey McGaw', 1781289353, 'active', '', 'Consor Engineering and Land Surveying-N.Y., PC', '', 'Kelsey', 'McGaw', '', 'Rocky Hill', '860-840-2505', '06067', '50 Inwood Road, Suite 101', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (45, 'walter.clark@exp.com', 'Walter Clark', 1781289353, 'active', '', 'EXP U.S. Services Inc.', '', 'Walter', 'Clark', '', 'Bridgewater', '908-547-2320', '08807', '1170 Route 22, Suite 103', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (46, 'figgqual@figgbridge.com', 'Joseph Doll', 1781289353, 'active', '', 'Figg Bridge Inspection, Inc', '', 'Joseph', 'Doll', '', 'Tallahassee', '(850)224-7400', '32301', '424 N. Calhoun Street', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (47, 'jdoll@figgbridge.com', 'Joseph Doll', 1781289353, 'active', '', '', '', '', '', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (48, 'gdorosh@fando.com', 'Gregory Dorosh', 1781289353, 'active', '', 'Fuss & O''Neill, Inc.', '', 'Gregory', 'Dorosh', '', 'Manchester', '(860)783-4685', '06040', '146 Hartford Road', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (50, 'kboerner@gfnet.com', 'Kevin Boerner', 1781289354, 'active', '', 'Gannett Fleming, Inc.', '', 'Kevin', 'Boerner', '', 'Rocky Hill', '(856)396-2226', '06067', '2189 Silas Deane Highway, Suite 17', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (53, 'myako@geiconsultants.com', 'Michael Yako', 1781289354, 'active', '', 'GEI Consultants, Inc.', '', 'Michael', 'Yako', '', 'Glastonbury', '(781)721-4043', '06033', '455 Winding Brook Drive, Suite 201', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (54, 'sbartkus@gm2inc.com', 'Shawna Barkus', 1781289354, 'active', '', 'GM2 Associates, Inc.', '', 'Shawna', 'Barkus', '', 'Glastonbury', '(860)659-1416', '06033', '115 Glastonbury Boulevard', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (55, 'ko@greenintl.com', 'Ko Ishikura', 1781289354, 'active', '', 'Green International Affiliates, Inc.', '', 'Ko', 'Ishikura', '', 'Tewksbury', '(978)923-0400', '01876', '100 Ames Pond Drive, Suite 200', 'MA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (56, 'kfarhoumand@greenintl.com', 'Ko Ishikura', 1781289354, 'active', '', '', '', '', '', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (57, 'gjohnson@gpinet.com', 'Gregory Johnson', 1781289355, 'active', '', 'Greenman-Pedersen, Inc.', '', 'Gregory', 'Johnson', '', 'Shelton', '908-287-2653', '06486', '2 Corporate Drive, Suite 633', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (60, 'sharlacker@hardesty-hanover.com', 'Steven D. Harlacker', 1781289355, 'active', '', 'Hardesty & Hanover, LLC', '', 'Steven', 'D. Harlacker', '', 'New Haven', '(203)772-2857', '06510', '59 Elm Street, Suite 406', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (66, 'mlow@hoyletanner.com', 'Matthew Low', 1781289356, 'active', '', 'Hoyle, Tanner & Associates, Inc.', '', 'Matthew', 'Low', '', 'Manchester', '(603)460-5188', '03101', '150 Dow Street', 'NH', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (67, 'larry.murphy@jacobs.com', 'Larry Murphy', 1781289356, 'active', '', 'Jacobs Engineering Group, Inc', '', 'Larry', 'Murphy', '', 'Wethersfield', '860.729-7859', '06109', '100 Great Meadow Road, Suite 707', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (68, 'julie.vers@jvcengineering.com', 'Julie Vers', 1781289356, 'active', '', 'Julie Vers Consulting Engineering LLC', '', 'Julie', 'Vers', '', 'West Palm Beach', '561-214-3807', '33401', '224 Almeria Road', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (69, 'nkulikauskas@kleinfelder.com', 'Neil Kulikauskas', 1781289356, 'active', '', 'Kleinfelder Northeast, Inc.', '', 'Neil', 'Kulikauskas', '', 'Rocky Hill', '860-258-7129', '06067', '400 Capital Boulevard, Suite 104', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (71, 'achakraborty@kseng.com', 'Andy Chakraborty', 1781289356, 'active', '', '', '', '', '', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (72, 'pmagyar@haleyward.com', 'Paul Magyar', 1781289357, 'active', '', 'Lenard Engineering, Inc.', '', 'Paul', 'Magyar', '', 'Glastonbury', '(860)659-3100', '06033', '2210 Main Street, P. O. Box 1088', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (73, 'car@luminalidar.com', 'Catherine Ruiz', 1781289357, 'active', '', 'Lumina Lidar LLC', '', 'Catherine', 'Ruiz', '', 'Riverside', '203-742-0411', '06878', '1155 East Putnam Avenue', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (74, 'jpope@msimarinesolutions.com', 'Jeremy Pope', 1781289357, 'active', '', 'Marine Solutions, Inc.', '', 'Jeremy', 'Pope', '', 'Newark', '973-288-9574', '07102', '550 Broad Street, Suite 1408', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (75, 'tkendrick@mjinc.com', 'Thomas Kendrick', 1781289357, 'active', '', 'McFarland-Johnson, Inc.', '', 'Thomas', 'Kendrick', '', 'Acton', '978.692.0522', '01720', '125 Nagog Park, Suite 220', 'MA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (76, 'wmccarthy@mgmclaren.com', 'William J. McCarthy, III', 1781289357, 'active', '', 'McLaren Technical Services, Inc.', '', 'William', 'J. McCarthy, III', '', 'Woodcliff Lake', '201.775.6000', '07677', '530 Chestnut Ridge Rd', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (79, 'mmdunay@modjeski.com', 'Michael F. Britt', 1781289358, 'active', '', 'Modjeski and Masters, Inc.', '', 'Michael', 'F. Britt', '', 'Mechanicsburg', '(717)790-9565', '17050', '100 Sterling Parkway, Suite 302', 'PA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (80, 'jeffrey.long@mottmac.com', 'Jeffrey Long', 1781289358, 'active', '', 'Mott MacDonald NY, Inc.', '', 'Jeffrey', 'Long', '', 'Rocky Hill', '(781)636-4033', '06067', '175 Capital Boulevard, Suite 403', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (81, 'marketing@mpengs.com', 'Mahendra Patel', 1781289358, 'active', '', 'MP Engineers and Architects, P.C.', '', 'Mahendra', 'Patel', '', 'New York', '212-736-1100', '10006', '40 Rector Street, Suite 1020B', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (82, 'sajjad.alam@parsons.com', 'Sajjad Alam', 1781289358, 'active', '', 'Parsons Transportation Group, Inc.', '', 'Sajjad', 'Alam', '', 'East Hartford', '860.200.9170', '06108', '330 Roberts Street, Suite 401', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (83, 'kbeek@patrickco.com', 'Kimberly Beek', 1781289358, 'active', '', 'Patrick Engineering, Inc', '', 'Kimberly', 'Beek', '', 'Boston', '857-283-6389', '02109', '2 Liberty Square, 8th Floor', 'MA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (84, 'rroberts@pennoni.com', 'Richard Roberts', 1781289358, 'active', '', 'Pennoni Associates, Inc.', '', 'Richard', 'Roberts', '', 'Philadelphia', '215-222-3000', '19103', '1900 Market Street, Suite 300', 'PA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (85, 'kumarb@primeeng.com', 'Kumar Buvanendaran', 1781289358, 'active', '', 'Prime AE Group, Inc', '', 'Kumar', 'Buvanendaran', '', 'Hartford', '(860) 436-5600', '06109', '100 Great Meadow Road, 6th Floor', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (86, 'rsaleh@rhsconsultingdesign.com', 'Rifat Saleh', 1781289359, 'active', '', 'RHS Consulting Design, LLC', '', 'Rifat', 'Saleh', '', 'Cheshire', '(203)439.9340', '06410', '345 Highland Ave, Suite 201', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (87, 'andrew.lessard@stantec.com', 'Andrew Lessard', 1781289359, 'active', '', 'Stantec Consulting Services Inc.', '', 'Andrew', 'Lessard', '', 'New Haven', '(203)212-5789', '06510-3014', '55 Church Street, Suite 601', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (88, 'martin.pierce@steereengineering.com', 'Martin Pierce', 1781289359, 'active', '', 'Steere Engineering Inc.', '', 'Martin', 'Pierce', '', 'Warwick', '4017737880', '02886', '2350 Post Road, Suite 100', 'RI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (89, 'david.breza@stvinc.com', 'David Breza', 1781289359, 'active', '', 'STV Incorporated', '', 'David', 'Breza', '', 'Hartford', '(203) 383.5125', '06103', '280 Trumbull Street, 14th Floor', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (92, 'jtrunfio@theengineeringcorp.com', 'Jody Trunfio', 1781289359, 'active', '', 'The Engineering Corp, Inc. (TEC)', '', 'Jody', 'Trunfio', '', 'Lawrence', '978.794.1792 x1034', '01843', '282 Merrimack Street, 2nd Floor', 'MA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (93, 'jbmcgovern@transystems.com', 'J. Brian McGovern', 1781289360, 'active', '', 'TranSystems Corporation of Connecticut', '', 'J.', 'Brian McGovern', '', 'Meriden', '(860)274-7544', '06450', '530 Preston Avenue, Suite 100', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (94, 'ralph@vbtechcorp.com', 'Ralph A. Phillips, Jr., PE', 1781289360, 'active', '', 'VB Technologies Corporation', '', 'Ralph', 'A. Phillips, Jr., PE', '', 'Rocky Hill', '(860)432-0951', '06067', '2049 Silas Deane Highway, Suite 1E', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (96, 'rbousa@vhb.com', 'Robin Bousa', 1781289360, 'active', '', 'VHB, Inc.', '', 'Robin', 'Bousa', '', 'Wethersfield', '', '06109', '100 Great Meadow Road, Suite 200', 'CT', 'US', '', '', '{}', '', '', 'rbousa@vhb.com', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (97, 'jcostello@wmcengineers.com', 'Jay Costello', 1781289360, 'active', '', 'Wengell, McDonnell & Costello, Inc.', '', 'Jay', 'Costello', '', 'Newington', '(860)667-9624', '06111', '87 Holmes Road', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (98, 'casalep@wseinc.com', 'Pompeo Casale', 1781289360, 'active', '', 'Weston & Sampson Engineers, Inc.', '', 'Pompeo', 'Casale', '', 'Rocky Hill', '508.202.4211', '06067', '712 Brook Street, suite 103', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (99, 'slonusl@wseinc.com', 'Pompeo Casale', 1781289360, 'active', '', '', '', '', '', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (100, 'jason.gallant@wright-pierce.com', 'Jason Gallant', 1781289361, 'active', '', 'Wright-Pierce Corporation', '', 'Jason', 'Gallant', '', 'Middletown', '603-570-7166', '06457', '169 Main Street', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (101, 'anthony.moretti@wsp.com', 'Anthony Moretti', 1781289361, 'active', '', 'WSP USA Inc', '', 'Anthony', 'Moretti', '', 'Glastonbury', '860-815-0257', '06033', '500 Winding Brook Drive', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (102, 'zohaibe840@gmail.com', 'zohaib', 1781529855, 'active', '', '', '', '', '', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (103, 'maaz.khurshid.work@gmail.com', 'mazz', 1781531127, 'active', '', '', '', '', '', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (104, 'patrick@metroassoc.com', 'Patrick', 1781531371, 'active', '', '', '', '', '', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (105, 'pnovick@hotmail.com', 'Pnovick', 1781531387, 'active', '', '', '', '', '', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (106, 'fiveer840@gmail.com', 'TEST SEED - Patrick', 1781606738, 'active', 'test_seed', 'Metro Associates', 'Senior Recruiter', '', '', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (107, 'news@patricknovick.com', 'TEST SEED - Sender', 1781606738, 'active', 'test_seed', 'Metro Associates', 'Marketing Coordinator', '', '', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (386, 'mgateau@2lsconsulting.com', 'Gateau, Marc-Henri', 1782235834, 'active', '', '2LS Consulting Engineers', 'Associate Principal – P/FP', 'Gateau,', 'Marc-Henri', '', 'New York', '(347) 515-5638', '', '242 West 30th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (387, 'ekeane@2lsconsulting.com', 'Keane, Eamonn', 1782235835, 'active', '', '2LS Consulting Engineers', 'Associate Principal', 'Keane,', 'Eamonn', '', 'New York', '(917) 267-8945 ext. 115', '', '242 West 30th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (388, 'jlatterman@2lsconsulting.com', 'ekeane@2lsconsulting.com', 1782235835, 'active', '', '2LS Consulting Engineers', 'Owner, Mechanical PE', 'ekeane@2lsconsulting.com', '', '', 'New York', '(516) 458-6020', '', '242 West 30th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (389, 'gleone@2lsconsulting.com', 'Leone, Gregory (Greg)', 1782235836, 'active', '', '2LS Consulting Engineers', 'Principal', 'Leone,', 'Gregory (Greg)', '', 'New York', '(917) 921-5069', '', '242 West 30th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (390, 'psoames@2lsconsulting.com', 'Soames, Paul', 1782235837, 'active', '', '2LS Consulting Engineers', 'Former Founding Principal', 'Soames,', 'Paul', '', 'New York', '(347) 656-4540', '', '242 West 30th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (391, 'tzahirudin@2lsconsulting.com', 'Zahirudin, Tricia', 1782235837, 'active', '', '2LS Consulting Engineers', 'Office Manager', 'Zahirudin,', 'Tricia', '', 'New York', '(917) 525-2543', '', '242 West 30th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (392, 'bjaglal@2lsconsulting.com', 'Bobby Jaglal', 1782235838, 'active', '', '2LS Consulting Engineers', 'Associate Principal', 'Bobby', 'Jaglal', '', 'New York', '(917) 525-2543', '', '242 West 30th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (393, 'jalfieri@akrf.com', 'Alfieri, Jaimee', 1782235839, 'active', '', 'AKRF', 'Director Of Human Resources', 'Alfieri,', 'Jaimee', '', 'New York', '(800) 899-2573', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (394, 'lbischoff@akrf.com', 'Bischoff, Lance', 1782235839, 'active', '', 'AKRF', 'Senior Technical Director', 'Bischoff,', 'Lance', '', '', '(212) 447-5546', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (395, 'gmarcus@akrf.com', 'Marcus, Gary', 1782235840, 'active', '', 'AKRF', 'Vice President And Head Of Geotechnical Engineering Department', 'Marcus,', 'Gary', '', 'New York', '(800) 899-2573', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (396, 'emoore@akrf.com', 'Moore, Ellen', 1782235840, 'active', '', 'AKRF', 'Hr', 'Moore,', 'Ellen', '', 'New York', '(800) 899-2573', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (397, 'benjaminsachwald@gmail.com', 'Sachwald, Benjamin', 1782235841, 'active', '', 'AKRF', 'Acoustical Consultant', 'Sachwald,', 'Benjamin', '', 'New York', '(718) 309-4814', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (398, 'sbakas@arqmia.com', 'Bakas, Sergio', 1782235842, 'active', '', 'Arquitectonica', 'Vp', 'Bakas,', 'Sergio', '', 'Miami', '(305) 372-1812', '', '2900 Oak Ave', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (399, 'bfort@arquitectonica.com', 'Fort-Brescia, Bernardo', 1782235842, 'active', '', 'Arquitectonica', 'Principal', 'Fort-Brescia,', 'Bernardo', '', 'Miami', '(305) 372-1812', '', '2900 Oak Ave', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (400, 'sgutierrez@arquitectonica.com', 'Gutierrez, Sherri', 1782235843, 'active', '', 'Arquitectonica', 'Vice President', 'Gutierrez,', 'Sherri', '', 'Miami', '(305) 372-1812', '', '2900 Oak Ave', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (401, 'jkurzner@utexas.edu', 'Kurzner, Jarod', 1782235844, 'active', '', 'Arquitectonica', 'Junior Architect', 'Kurzner,', 'Jarod', '', 'Miami', '(954) 849-7037', '', '2900 Oak Ave', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (402, 'treedy@arquitectonica.com', 'Reedy, Timothy', 1782235844, 'active', '', 'Arquitectonica', 'CEO', 'Reedy,', 'Timothy', '', 'Miami', '(917) 941-5379', '', '2900 Oak Ave', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (403, 'lspear@arquitectonica.com', 'Spear, Laurinda', 1782235845, 'active', '', 'Arquitectonica', 'Principal', 'Spear,', 'Laurinda', '', 'Miami', '(305) 372-1812', '', '2900 Oak Ave', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (404, 'mga@bala.com', 'Anastasio, Michael', 1782235845, 'active', '', 'BALA Consulting Engineers', 'President', 'Anastasio,', 'Michael', '', 'New York', '(212) 857-9400', '', '1 William Street, 2nd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (405, 'jhb@bala.com', 'Brockwell, John', 1782235846, 'active', '', 'BALA Consulting Engineers', 'VP, Mission Critical', 'Brockwell,', 'John', '', 'New York', '(212) 857-9400', '', '1 William Street, 2nd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (406, 'kdb@bala.com', 'Burkert, Kimberly "Kim"', 1782235847, 'active', '', 'BALA Consulting Engineers', 'Chief FInancial Officer', 'Burkert,', 'Kimberly "Kim"', '', 'New York', '(212) 857-9400', '', '1 William Street, 2nd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (407, 'bhc@bala.com', 'Crossland, Bret', 1782235847, 'active', '', 'BALA Consulting Engineers', 'Partner, PE', 'Crossland,', 'Bret', '', 'New York', '(212) 857-9402', '', '1 William Street, 2nd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (408, 'asd@bala.com', 'Dilfeild, Shawn', 1782235848, 'active', '', 'BALA Consulting Engineers', '', 'Dilfeild,', 'Shawn', '', 'New York', '(610) 994-9306', '', '1 William Street, 2nd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (409, 'hebafahmy@live.com', 'Fahmy, Ehab', 1782235849, 'active', '', 'BALA Consulting Engineers', 'Electrical Commissioning Engineer', 'Fahmy,', 'Ehab', '', 'New York', '(212) 857-9400 x416', '', '1 William Street, 2nd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (410, 'luisformoso776@gmail.com', 'Formoso, Luis "Lou"', 1782235849, 'active', '', 'BALA Consulting Engineers', 'Electrical Engineer Dept. Head', 'Formoso,', 'Luis "Lou"', '', 'New York', '(973) 342-5847', '', '1 William Street, 2nd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (411, 'atg@bala.com', 'Gibbons, Anthony', 1782235850, 'active', '', 'BALA Consulting Engineers', 'Electrical Department Manager', 'Gibbons,', 'Anthony', '', 'New York', '(610) 649-8000', '', '1 William Street, 2nd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (412, 'dcj@bala.com', 'Jocelyn, Daniel', 1782235851, 'active', '', 'BALA Consulting Engineers', 'Partner', 'Jocelyn,', 'Daniel', '', 'New York', '(212) 453-0035 ext. 401', '', '1 William Street, 2nd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (413, 'cbk@bala.com', 'Kensky, Charles "Chuck"', 1782235851, 'active', '', 'BALA Consulting Engineers', 'EVP, PE, LEED AP, CEA & Head Of MEP', 'Kensky,', 'Charles "Chuck"', '', 'New York', '(610) 994-9309', '', '1 William Street, 2nd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (414, 'shl@bala.com', 'Lawson, Scott', 1782235852, 'active', '', 'BALA Consulting Engineers', 'EVP', 'Lawson,', 'Scott', '', 'New York', '(212) 857-9400', '', '1 William Street, 2nd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (415, 'kmt@bala.com', 'Talbot, Karen M.', 1782235852, 'active', '', 'BALA Consulting Engineers', 'HR Manager', 'Talbot,', 'Karen M.', '', 'King of Prussia', '(610) 649-8000', '', '', 'PA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (416, 'rjv@bala.com', 'Voth, Robert J.', 1782235853, 'active', '', 'BALA Consulting Engineers', 'EVP', 'Voth,', 'Robert J.', '', 'New York', '(212) 857-9400', '', '1 William Street, 2nd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (417, 'bandtesq@hotmail.com', 'Wilkinson, Robert', 1782235854, 'active', '', 'BALA Consulting Engineers', 'Department Head, Electrical Engineer  MSEM, PE, JD,', 'Wilkinson,', 'Robert', '', 'New York', '(631) 672-4854', '', '1 William Street, 2nd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (418, 'darin@bcengineer.com', 'Darin Seidel', 1782235854, 'active', '', 'BC Engineers', 'PE - Vice President', 'Darin', 'Seidel', '', '', '(913) 262-1772', '', '', 'KS', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (419, 'jbasil@becht.com', 'Basil, John', 1782235855, 'active', '', 'Becht (Becht Building Technologies (BT)', 'General Manager, Becht Engineering', 'Basil,', 'John', '', 'Point Pleasant Beach', '(908) 580-1119', '', '410 RIchmond Avenue', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (420, 'laurie@becht.com', 'Becht, Laurie', 1782235856, 'active', '', 'Becht (Becht Building Technologies (BT)', 'SVP,  Principal', 'Becht,', 'Laurie', '', 'Point Pleasant Beach', '(908) 580-1119', '', '410 RIchmond Avenue', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (421, 'rbryant@bechtbt.com', 'Robert G. Bryant', 1782235856, 'active', '', 'Becht (Becht Building Technologies (BT)', 'President', 'Robert', 'G. Bryant', '', 'Point Pleasant Beach', '(908) 240-3793', '', '410 RIchmond Avenue', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (422, 'cbryant@bechtbt.com', 'Bryant, Cindy', 1782235857, 'active', '', 'Becht (Becht Building Technologies (BT)', 'Accounts Payable', 'Bryant,', 'Cindy', '', 'Point Pleasant Beach', '(732) 714-8900', '', '410 RIchmond Avenue', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (423, 'ecollins0216@verizon.net', 'Collins, Eric', 1782235857, 'active', '', 'Becht (Becht Building Technologies (BT)', 'MEP Division Manager, PE', 'Collins,', 'Eric', '', 'Point Pleasant Beach', '(917) 270-7467', '', '410 RIchmond Avenue', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (424, 'lcopeland@bechtbt.com', 'Copeland, Lynne J.', 1782235858, 'active', '', 'Becht (Becht Building Technologies (BT)', 'Administrative Assistant', 'Copeland,', 'Lynne J.', '', 'Point Pleasant Beach', '(732) 714-8900 x3121', '', '410 RIchmond Avenue', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (425, 'alawlor@bechtbt.com', 'Lawlor, Alison', 1782235859, 'active', '', 'Becht (Becht Building Technologies (BT)', 'Dir. Of Finance & Human Resources', 'Lawlor,', 'Alison', '', 'Point Pleasant Beach', '(908) 333-1021', '', '410 RIchmond Avenue', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (426, 'jlichon@bechtbt.com', 'Lichon, Joseph ''Joe''', 1782235859, 'active', '', 'Becht (Becht Building Technologies (BT)', 'Chief Electrical Engineer, PE', 'Lichon,', 'Joseph ''Joe''', '', 'Point Pleasant Beach', '(732) 714-8900', '', '410 RIchmond Avenue', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (427, 'cbarnes@bokapowell.com', 'Barnes, Chris', 1782235860, 'active', '', 'BOKA Powell', 'Principla/Owner', 'Barnes,', 'Chris', '', 'Dallas', '(972) 701-9000', '', '8070 Park Lane, Ste 300', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (428, 'jbarnum@bokapowell.com', 'Barnum, Jim', 1782235861, 'active', '', 'BOKA Powell', 'Hr Manager', 'Barnum,', 'Jim', '', 'Dallas', '(469) 398-3152', '', '8070 Park Lane, Ste 300', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (429, 'mdabney@bokapowell.com', 'Dabney, Mark', 1782235861, 'active', '', 'BOKA Powell', 'Principal', 'Dabney,', 'Mark', '', 'Dallas', '(972) 701-9000', '', '8070 Park Lane, Ste 300', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (430, 'tdwyer@bokapowell.com', 'Dwyer, Tom', 1782235862, 'active', '', 'BOKA Powell', 'Principal Healthcare', 'Dwyer,', 'Tom', '', 'Dallas', '(972) 701-9000', '', '8070 Park Lane, Ste 300', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (431, 'jhilliard@bokapowell.com', 'Hilliard, Joseph', 1782235863, 'active', '', 'BOKA Powell', 'Principal', 'Hilliard,', 'Joseph', '', 'Dallas', '(972) 701-9000', '', '8070 Park Lane, Ste 300', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (432, 'hleimann@bokapowell.com', 'Leimann, Henry', 1782235863, 'active', '', 'BOKA Powell', 'Project Designer', 'Leimann,', 'Henry', '', 'Dallas', '(972) 701-9000', '', '8070 Park Lane, Ste 300', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (433, 'jorfield@bokapowell.com', 'Orfield, John', 1782235864, 'active', '', 'BOKA Powell', 'Principal', 'Orfield,', 'John', '', 'Dallas', '(972) 701-9000', '', '8070 Park Lane, Ste 300', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (434, 'dpowell@bokapowell.com', 'Powell, Donald R', 1782235864, 'active', '', 'BOKA Powell', 'Principal', 'Powell,', 'Donald R', '', 'Dallas', '(972) 701-9000', '', '8070 Park Lane, Ste 300', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (435, 'kdowney@bsals.com', 'Kevin Downey', 1782235865, 'active', '', 'BSA LifeStructures', 'Senior Vice President', 'Kevin', 'Downey', '', 'Indianapolis', '', '', '', 'IN', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (436, 'rfetz@bsals.com', 'Richard Fetz', 1782235866, 'active', '', 'BSA LifeStructures', 'Vice President', 'Richard', 'Fetz', '', 'Indianapolis', '', '', '', 'IN', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (437, 'plangowski@bsalifestructures.com', 'Peter Langowski', 1782235870, 'active', '', 'BSA LifeStructures', 'Owner', 'Peter', 'Langowski', '', 'Indianapolis', '', '', '', 'IN', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (438, 'djacobs@bsalifestructures.com', 'Dale Jacobs', 1782235870, 'active', '', 'BSA LifeStructures', 'Senior Director', 'Dale', 'Jacobs', '', 'Indianapolis', '', '', '', 'IN', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (439, 'mcanin@canin.com', 'Myrna Canin', 1782235871, 'active', '', 'Canin Associates', 'VP', 'Myrna', 'Canin', '', 'Orlando', '(407) 422-4040 ph 407.425.7427fx', '', '500 Delaney Avenue', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (441, 'mcastro@canin.com', 'Castro, Mauricio', 1782235872, 'active', '', 'Canin Associates', 'VP Land Planning', 'Castro,', 'Mauricio', '', 'Orlando', '(407) 422-4040', '', '500 Delaney Ave.', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (442, 'pbabigian@ceramiassociates.com', 'Babigian, Peter A.', 1782235873, 'active', '', 'Cerami Companies / Cerami & Associates', 'Partner, PE RCDD LEED AP BD+C', 'Babigian,', 'Peter A.', '', 'New York', '(212) 370-1776', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (443, 'vcerami@ceramiassociates.com', 'Cerami, Victoria ''Vicki''', 1782235873, 'active', '', 'Cerami Companies / Cerami & Associates', 'President, CEO', 'Cerami,', 'Victoria ''Vicki''', '', 'New York', '(212) 370-1776', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (444, 'ddulgerian@ceramiassociates.com', 'Dulgerian, Diane', 1782235874, 'active', '', 'Cerami Companies / Cerami & Associates', 'Administrative Assistant', 'Dulgerian,', 'Diane', '', 'New York', '(212) 616-4186', '', '404 Fifth Avenue', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (445, 'mezold@ceramiassociates.com', 'Ezold, Matthew', 1782235875, 'active', '', 'Cerami Companies / Cerami & Associates', 'Principal, Philadelphia', 'Ezold,', 'Matthew', '', 'New York', '(212) 616-6474', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (446, 'mferrara@ceramiassociates.com', 'Ferrara, Michael ''Mike''', 1782235875, 'active', '', 'Cerami Companies / Cerami & Associates', 'COO', 'Ferrara,', 'Michael ''Mike''', '', 'New York', '(212) 370-1776', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (447, 'dannyro24@gmail.com', 'Georgescu, Dan', 1782235876, 'active', '', 'Cerami Companies / Cerami & Associates', 'Principal', 'Georgescu,', 'Dan', '', 'New York', '(718) 744-5753', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (448, 'jlau@ceramiassociates.com', 'Lau, Justin', 1782235877, 'active', '', 'Cerami Companies / Cerami & Associates', 'Associate Principal', 'Lau,', 'Justin', '', 'New York', '(212) 370-1776', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (449, 'aleslie@ceramiassociates.com', 'Leslie, Aiden', 1782235877, 'active', '', 'Cerami Companies / Cerami & Associates', 'Executive Assistant To CEO', 'Leslie,', 'Aiden', '', 'New York', '(212) 370-1776', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (450, 'amaniscalco@ceramiassociates.com', 'Maniscalco, Albert', 1782235878, 'active', '', 'Cerami Companies / Cerami & Associates', 'Partner', 'Maniscalco,', 'Albert', '', 'New York', '(212) 370-1776', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (451, 'emanito@ceramiassociates.com', 'Manito, Eileen', 1782235878, 'active', '', 'Cerami Companies / Cerami & Associates', 'HR, Recruiter', 'Manito,', 'Eileen', '', 'New York', '(212) 370-1776', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (452, 'tmuench@ceramiassociates.com', 'Mills, Trish (Muench)', 1782235879, 'active', '', 'Cerami Companies / Cerami & Associates', 'Principal, People Development', 'Mills,', 'Trish (Muench)', '', 'New York', '(646) 630-1024', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (453, 'cpeltier@ceramiassociates.com', 'Peltier, Christopher', 1782235880, 'active', '', 'Cerami Companies / Cerami & Associates', 'Principal', 'Peltier,', 'Christopher', '', 'New York', '(646) 841-0981', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (454, 'jschreier@ceramiassociates.com', 'Schreier, Jeff', 1782235880, 'active', '', 'Cerami Companies / Cerami & Associates', 'Cfo', 'Schreier,', 'Jeff', '', 'New York', '(212) 370-1776', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (455, 'gary@cbaarchitects.com', 'Brock, Gary', 1782235881, 'active', '', 'Charlan Brock & Associates, Inc.', 'Principal', 'Brock,', 'Gary', '', 'Maitland', '(407) 660-8900 ext 31', '', '2600 Maitland Center Parkway', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (456, 'butch@cbaarchitects.com', 'Charlan, Charles (Butch)', 1782235882, 'active', '', 'Charlan Brock & Associates, Inc.', 'Principal', 'Charlan,', 'Charles (Butch)', '', 'Maitland', '(407) 660-8900', '', '2600 Maitland Center Parkway', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (457, 'david@cbaarchitects.com', 'Portwood, David', 1782235882, 'active', '', 'Charlan Brock & Associates, Inc.', 'Principal', 'Portwood,', 'David', '', 'Maitland', '(407) 660-8900', '', '2600 Maitland Center Parkway', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (458, 'cbuscarino@theclarientgroup.com', 'Buscarino, Charles', 1782235883, 'active', '', 'The Clarient Group', 'President/CEO', 'Buscarino,', 'Charles', '', 'New York', '(646) 695-7160', '', '630 Ninth Avenue, Suite 1212', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (459, 'ascimeca@theclarientgroup.com', 'Scimeca, Anthony', 1782235883, 'active', '', 'The Clarient Group', 'Director Of Operations', 'Scimeca,', 'Anthony', '', 'New York', '(646) 695-7173', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (460, 'lilburntomcat992@gmail.com', 'Thomas, Harrell', 1782235884, 'active', '', 'The Clarient Group', 'VP, Chief Engineer, RCDD', 'Thomas,', 'Harrell', '', 'New York', '(212) 586-5840', '', '630 Ninth Avenue, Suite 1212', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (461, 'sclaxton@cmtaegrs.com', 'Claxton, Sam', 1782235885, 'active', '', 'CMTA Engineering Consultants, Inc.', 'Principal', 'Claxton,', 'Sam', '', 'Lexington', '(281) 419-9899', '', '', 'KY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (462, 'jfarber@cmtaegrs.com', 'Farber, Jess', 1782235885, 'active', '', 'CMTA Engineering Consultants, Inc.', 'Principal', 'Farber,', 'Jess', '', '', '(281) 419-9899', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (463, 'ggehrt@cmtaegrs.com', 'Gehrt, Greg', 1782235886, 'active', '', 'CMTA Engineering Consultants, Inc.', 'Associate Principal', 'Gehrt,', 'Greg', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (464, 'pguffey@cmtaegrs.com', 'Guffey, Paula', 1782235887, 'active', '', 'CMTA Engineering Consultants, Inc.', 'Principal', 'Guffey,', 'Paula', '', 'Arlington', '', '', '', 'VA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (465, 'thans@cmtaegrs.com', 'Hans, Tony', 1782235887, 'active', '', 'CMTA Engineering Consultants, Inc.', 'VP, Electrical Engineering', 'Hans,', 'Tony', '', '', '(502) 326-3085', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (466, 'lharrelson@cmtaegrs.com', 'Harrelson, Lee', 1782235888, 'active', '', 'CMTA Engineering Consultants, Inc.', 'Principal', 'Harrelson,', 'Lee', '', 'Arlington', '(703) 525-6268 Ext. 161', '', '', 'VA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (467, 'mhinkel@cmtaegrs.com', 'Hinkel, Mary-Lynn', 1782235889, 'active', '', 'CMTA Engineering Consultants, Inc.', 'HR Staffing Coordinator', 'Hinkel,', 'Mary-Lynn', '', '', '(859) 253-0892', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (468, 'tgmorris@cmtaegrs.com', 'Morris, Tim', 1782235889, 'active', '', 'CMTA Engineering Consultants, Inc.', 'Cfo', 'Morris,', 'Tim', '', 'Louisville', '(502) 741-0567', '', '', 'KY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (469, 'kmussler@cmtaegrs.com', 'Mussler, Kevin', 1782235890, 'active', '', 'CMTA Engineering Consultants, Inc.', 'Vice President', 'Mussler,', 'Kevin', '', 'Lexington', '(281) 419-9899', '', '1610 Woodstead Court', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (470, 'trohrbaugh@cmtaegrs.com', 'Rohrbaugh, Thomas M', 1782235891, 'active', '', 'CMTA Engineering Consultants, Inc.', 'Managing Principal', 'Rohrbaugh,', 'Thomas M', '', 'Arlington', '', '', '', 'VA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (471, 'kseibert@cmtaegrs.com', 'Seibert, Kenneth', 1782235891, 'active', '', 'CMTA Engineering Consultants, Inc.', 'President/CEO', 'Seibert,', 'Kenneth', '', '', '(502) 326-3085', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (472, 'mseibert@cmtaegrs.com', 'Seibert, Mark', 1782235892, 'active', '', 'CMTA Engineering Consultants, Inc.', 'Managing Partner/Texas', 'Seibert,', 'Mark', '', '', '(281) 419-9899', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (473, 'jeremy@cmtaegrs.com', 'Smith, Jeremy', 1782235892, 'active', '', 'CMTA Engineering Consultants, Inc.', 'VP,  PE, CxA, CGD, HBDP, LEED AP', 'Smith,', 'Jeremy', '', '', '(859) 253-0892', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (474, 'gswaluk@cmtaegrs.com', 'Swaluk, Greg', 1782235893, 'active', '', 'CMTA Engineering Consultants, Inc.', 'Prinicipal Mechanical Engineering Director', 'Swaluk,', 'Greg', '', 'Arlington', '(202) 286-0007', '', '', 'VA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (475, 'tannestephens@gmail.com', 'Stephens, Tanne', 1782235894, 'active', '', 'Cooper Carry', 'Marketing Coordinator', 'Stephens,', 'Tanne', '', 'Alexandria', '(816) 248-5852', '', '218 N. Patrick St.', 'VA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (476, 'ebarbieri@cosentini.com', 'Barbieri, Edward', 1782235894, 'active', '', 'Cosentini', 'EVP, Mechanical Engineering, PE, LEED AP', 'Barbieri,', 'Edward', '', 'New York', '(212) 615-3600', '', 'Two Pennsylvania Plaza, 3rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (477, 'zbiler@cosentini.com', 'Biler, Zigmund', 1782235895, 'active', '', 'Cosentini', 'VP, Electrical Engineering', 'Biler,', 'Zigmund', '', 'New York', '(212) 615-3600', '', 'Two Pennsylvania Plaza, 3rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (478, 'sceasar@cosentini.com', 'Ceasar, Scott', 1782235896, 'active', '', 'Cosentini', 'SVP NYC Office', 'Ceasar,', 'Scott', '', 'New York', '(212) 615-3600', '', '225 West 34th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (479, 'pcosta@cosentini.com', 'Costa, Peter', 1782235896, 'active', '', 'Cosentini', 'VP, Plumbing & Fire Protection', 'Costa,', 'Peter', '', 'New York', '(212) 615-3600', '', 'Two Pennsylvania Plaza, 3rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (480, 'dderobertis@cosentini.com', 'DeRobertis, Dominick', 1782235897, 'active', '', 'Cosentini', 'SVP, Mechanical Engineering, PE, LEED AP', 'DeRobertis,', 'Dominick', '', 'New York', '(212) 615-3600', '', 'Two Pennsylvania Plaza, 3rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (481, 'rduke@cosentini.com', 'Duke, Randall ''Randy''', 1782235897, 'active', '', 'Cosentini', 'VP, Electrical Dept. Boston', 'Duke,', 'Randall ''Randy''', '', 'New York', '(617) 748-0007', '', 'Two Pennsylvania Plaza, 3rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (482, 'aenache@cosentini.com', 'Enache, Adrian', 1782235898, 'active', '', 'Cosentini', 'VP, Plumbing & Fire Protection Engineer', 'Enache,', 'Adrian', '', 'New York', '(212) 615-3970', '', 'Two Pennsylvania Plaza, 3rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (483, 'jfox@cosentini.com', 'Fox, Jordan', 1782235899, 'active', '', 'Cosentini', 'VP, Mechanical Engineering', 'Fox,', 'Jordan', '', 'New York', '(212) 615-3600', '', 'Two Pennsylvania Plaza, 3rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (484, 'skokotos@cosentini.com', 'Kokotos, Stefanos', 1782235899, 'active', '', 'Cosentini', 'VP, Mechanical Engineering', 'Kokotos,', 'Stefanos', '', 'New York', '(212) 615-3600', '', 'Two Pennsylvania Plaza, 3rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (485, 'rkuzmicki@cosentini.com', 'Kuzmicki, Roman', 1782235900, 'active', '', 'Cosentini', 'Director Of Quality Control/Vice President', 'Kuzmicki,', 'Roman', '', 'New York', '(212) 615-3600', '', 'Two Pennsylvania Plaza, 3rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (486, 'rleber@cosentini.com', 'Robert Leber', 1782235901, 'active', '', 'Cosentini', 'P.E., LEED AP | Senior Vice President', 'Robert', 'Leber', '', 'Boston', '(617) 285-7146', '', '', 'MA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (487, 'lledonne@cosentini.com', 'LeDonne, Lenore', 1782235901, 'active', '', 'Cosentini', 'Director, Human Resources', 'LeDonne,', 'Lenore', '', 'New York', '(212) 615-3885', '', 'Two Pennsylvania Plaza, 3rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (488, 'mlosquadro@cosentini.com', 'Losquadro, Michael', 1782235902, 'active', '', 'Cosentini', 'Vice Presdent, Electrical Engineering', 'Losquadro,', 'Michael', '', 'New York', '(212) 615-3600', '', 'Two Pennsylvania Plaza, 3rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (489, 'dmass@cosentini.com', 'Mass, Doug', 1782235903, 'active', '', 'Cosentini', 'President', 'Mass,', 'Doug', '', 'New York', '(212) 615-3600', '', 'Two Pennsylvania Plaza, 3rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (490, 'mmaybaum@cosentini.com', 'Maybaum, Michael "Mike"', 1782235903, 'active', '', 'Cosentini', 'Executive Vice President, PE', 'Maybaum,', 'Michael "Mike"', '', 'New York', '(917) 837-0148', '', '225 West 34th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (491, 'lmordetsky@cosentini.com', 'Mordetsky, Lenny', 1782235904, 'active', '', 'Cosentini', 'Director Of Commissioning', 'Mordetsky,', 'Lenny', '', 'New York', '(212) 615-3600', '', 'Two Pennsylvania Plaza, 3rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (492, 'wsmith@cosentini.com', 'Smith, Whitney', 1782235904, 'active', '', 'Cosentini', 'Director Sustainabiity & Energy Services', 'Smith,', 'Whitney', '', 'New York', '(212) 615-3600', '', 'Two Pennsylvania Plaza, 3rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (493, 'psosniak@gmail.com', 'Sosniak, Piotr', 1782235905, 'active', '', 'Cosentini', 'Director Of Commissioning', 'Sosniak,', 'Piotr', '', 'New York', '(646) 370-0969', '', 'Two Pennsylvania Plaza, 3rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (494, 'ovaidean@cosentini.com', 'Vaidean, Onorius', 1782235906, 'active', '', 'Cosentini', 'Vice President, IT', 'Vaidean,', 'Onorius', '', 'New York', '(917) 797-7375', '', 'Two Pennsylvania Plaza, 3rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (495, 'byozwiak@optonline.net', 'Yozwiak, Bernie', 1782235906, 'active', '', 'Cosentini', 'VP Electrical Commissioning & Design Project Manager', 'Yozwiak,', 'Bernie', '', 'Elmsford', '(914) 703-1860', '', '66 South Central Ave', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (496, 'joshzweback@gmail.com', 'Zweback, Joshua', 1782235907, 'active', '', 'Cosentini', 'Mechanical Engineer, VP, P.E. LEED AP', 'Zweback,', 'Joshua', '', 'New York', '(212) 615-3600', '', 'Two Pennsylvania Plaza, 3rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (497, 'shay@teamdtc.com', 'Atluru, Shay', 1782235908, 'active', '', 'DTC - Diversified Technology Consultants', 'President/ CEO', 'Atluru,', 'Shay', '', 'Hamden', '(203) 641-7429', '', '2321 Whitney Avenue', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (498, 'steve.gendreau@teamdtc.com', 'Gendreau, Steve', 1782235908, 'active', '', 'DTC - Diversified Technology Consultants', 'Vice President', 'Gendreau,', 'Steve', '', 'Hamden', '(203) 239-4200', '', '2321 Whitney Avenue', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (499, 'xjenn01x@gmail.com', 'Jennifer Mosquera', 1782235909, 'active', '', 'Ecosystem', '', 'Jennifer', 'Mosquera', '', 'New York', '(646) 692-7800', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (500, 'bruce.cohen@stantec.com', 'Cohen, Bruce', 1782235909, 'active', '', 'Edwards & Zuck AKA (Stantec)', 'Director Of Technology', 'Cohen,', 'Bruce', '', 'New York', '(212) 330-6161', '', '315 Park Ave South', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (501, 'mdonolli@edzuck.com', 'Donolli, Matthew G.', 1782235910, 'active', '', 'Edwards & Zuck AKA (Stantec)', 'Partner', 'Donolli,', 'Matthew G.', '', 'New York', '(917) 734-8549', '', '315 Park Ave South', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (502, 'shhjfh@aol.com', 'Hecht, Sol', 1782235911, 'active', '', 'Edwards & Zuck AKA (Stantec)', 'Vice President, Mechanical PE', 'Hecht,', 'Sol', '', 'New York', '(732) 675-2601', '', '315 Park Ave South', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (503, 'cmartalus@edzuck.com', 'Martalus, Christopher', 1782235911, 'active', '', 'Edwards & Zuck AKA (Stantec)', 'Cfo', 'Martalus,', 'Christopher', '', 'New York', '(212) 330-6202', '', '315 Park Ave South', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (504, 'pjsposato@edzuck.com', 'Sposato, Peter', 1782235912, 'active', '', 'Edwards & Zuck AKA (Stantec)', 'Managing Partner', 'Sposato,', 'Peter', '', 'New York', '(212) 330-6220', '', '315 Park Ave South', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (505, 'joe.thompson@stantec.com', 'Thompson, Joe', 1782235913, 'active', '', 'Edwards & Zuck AKA (Stantec)', 'Associate PrincipalPlumbing & Fire Protection', 'Thompson,', 'Joe', '', 'New York', '(347) 423-2364', '', '315 Park Ave South', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (506, 'acuadra@en-powergroup.com', 'Cuadra, Amalia', 1782235913, 'active', '', 'EN-POWER GROUP', 'Director Of Engineering', 'Cuadra,', 'Amalia', '', '', '(914) 263-1199', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (507, 'mscorrano@en-powergroup.com', 'Scorrano, Michael', 1782235914, 'active', '', 'EN-POWER GROUP', 'Managing Director', 'Scorrano,', 'Michael', '', '', '(914) 263-1199 x1', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (508, 'jgerbner@ewingcole.com', 'Gerbner, John', 1782235915, 'active', '', 'EwingCole', 'CEO', 'Gerbner,', 'John', '', 'Philadelphia', '(215) 923-2020', '', '100 N. 6th Street', 'PA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (509, 'rghisu@ewingcole.com', 'Ghisu, Robert', 1782235915, 'active', '', 'EwingCole', 'Principal & Dir Of Electrical Engiineering', 'Ghisu,', 'Robert', '', 'Philadelphia', '(215) 923-2020', '', '100 N. 6th Street', 'PA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (510, 'rrudy@ewingcole.com', 'Rudy, Roger', 1782235916, 'active', '', 'EwingCole', 'Principal, Director Of Operations', 'Rudy,', 'Roger', '', 'Philadelphia', '(215) 625-4674', '', '100 N. 6th Street', 'PA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (511, 'aalbin@eypae.com', 'Albin, Andy', 1782235916, 'active', '', 'EYP', 'Project Eexc & Principal Austin', 'Albin,', 'Andy', '', '', '(512) 214-7780', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (512, 'lbarrios@eypae.com', 'Barrios, Lilly', 1782235917, 'active', '', 'EYP', 'Hr Manager Houston & Dallas', 'Barrios,', 'Lilly', '', '', '(281) 935-2771', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (513, 'ccartusciello@eypae.com', 'Cartusciello, Cody', 1782235918, 'active', '', 'EYP', 'Managing Principal Dallas AIA, LEED AP BD+C', 'Cartusciello,', 'Cody', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (514, 'vcolon@eypae.com', 'Colon, Venessa', 1782235918, 'active', '', 'EYP', 'Senior Talent Acquisition Strategist', 'Colon,', 'Venessa', '', 'Albany', '(518) 795-3938', '', '201 Fuller Road', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (515, 'mfitzgeraldryan@eypae.com', 'Ryan, Moira Fitzgerald', 1782235919, 'active', '', 'EYP', 'Hr Manager', 'Ryan,', 'Moira Fitzgerald', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (516, 'hr@whrarchitects.com', 'Steward, Allison', 1782235920, 'active', '', 'EYP', 'Human Resources', 'Steward,', 'Allison', '', '', '(214) 468-8505', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (517, 'lstringer@eypae.com', 'Stringer, Leigh', 1782235920, 'active', '', 'EYP', 'Managing Principal  DC', 'Stringer,', 'Leigh', '', '', '(202) 471-5000', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (518, 'mvaughan@eypae.com', 'Vaughan, Mark', 1782235921, 'active', '', 'EYP', 'Sr Principal/Healthcare Architect', 'Vaughan,', 'Mark', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (519, 'dwatkins@whrarchitects.com', 'Watkins, David', 1782235921, 'active', '', 'EYP', 'President', 'Watkins,', 'David', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (520, 'joe@enviroyellowpages.com', 'Joe De Martini', 1782235922, 'active', '', 'EYP', 'President', 'Joe', 'De Martini', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (521, 'tbirdsey@eypae.com', 'Tom Birdsey', 1782235923, 'active', '', 'EYP', 'President', 'Tom', 'Birdsey', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (522, 'aamorosi@falconengineering.com', 'Amorosi, Andrew "Andy"', 1782235923, 'active', '', 'The Falcon Group', 'Principal', 'Amorosi,', 'Andrew "Andy"', '', 'Bridgewater', '(908) 595-0050', '', '682 Hwy 202/206', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (523, 'oballate@falconengineering.com', 'Ballate, Orlando', 1782235924, 'active', '', 'The Falcon Group', 'EVP, PE - Forensic/Claims/Litigation', 'Ballate,', 'Orlando', '', 'Bridgewater', '(908) 595-0050', '', '682 Hwy 202/206', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (524, 'tfoeldvari@falconengineering.com', 'Foeldvari, Terry', 1782235925, 'active', '', 'The Falcon Group', 'COO', 'Foeldvari,', 'Terry', '', 'Bridgewater', '(908) 223-5790', '', '682 Hwy 202/206', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (525, 'dguralchuk@falconengineering.com', 'Guralchuk, David', 1782235925, 'active', '', 'The Falcon Group', 'V.P. Energy Department', 'Guralchuk,', 'David', '', 'Bridgewater', '(484) 544-4128', '', '682 Hwy 202/206', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (526, 'sinisakolar@gmail.com', 'Kolar, Sinisa', 1782235926, 'active', '', 'The Falcon Group', 'Vice President, Miami Dept. Head', 'Kolar,', 'Sinisa', '', 'Bridgewater', '(786) 925-6785', '', '682 Hwy 202/206', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (527, 'kmarra@falconengineering.com', 'Marra, Kelly', 1782235926, 'active', '', 'The Falcon Group', 'HR Manager', 'Marra,', 'Kelly', '', '', '(908) 458-7160', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (528, 'esin@esinpektas.com', 'Pektas, Esin', 1782235927, 'active', '', 'The Falcon Group', 'VP, New York City Department Head', 'Pektas,', 'Esin', '', 'Bridgewater', '(917) 370-6986', '', '682 Hwy 202/206', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (529, 'wpyznar@falconengineering.com', 'Pyznar, William "Bill"', 1782235928, 'active', '', 'The Falcon Group', 'Senior Managing Principal', 'Pyznar,', 'William "Bill"', '', 'Bridgewater', '(908) 963-7332', '', '682 Hwy 202/206', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (530, 'avolpe@falconengineering.com', 'Volpe, Anthony', 1782235928, 'active', '', 'The Falcon Group', 'Principal, PE', 'Volpe,', 'Anthony', '', 'Bridgewater', '(908) 389-6194', '', '682 Hwy 202/206', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (531, 'swillis@falconengineering.com', 'Willis, Stewart "Stew"', 1782235929, 'active', '', 'The Falcon Group', 'Senior Vice President, Northeast Region', 'Willis,', 'Stewart "Stew"', '', 'Bridgewater', '(908) 595-0050', '', '682 Hwy 202/206', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (532, 'cbrown@flds.cc', 'Carl Brown', 1782235930, 'active', '', 'FDS Engineering', 'Senior VP / Dir of Operations / Partner', 'Carl', 'Brown', '', '', '', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (533, 'mike.keesee@gokeesee.com', 'Mike Keesee', 1782235930, 'active', '', 'FDS Engineering', 'CEO', 'Mike', 'Keesee', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (534, 'cbrown@fdseng.com', 'Carl Brown', 1782235931, 'active', '', 'FDS Engineering', 'Partner/ Senior VP / DO', 'Carl', 'Brown', '', 'Altamonte Springs', '', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (535, 'jblack@forumarchitecture.com', 'Black, James (Jim)', 1782235931, 'active', '', 'Forum Architecture', 'Partner', 'Black,', 'James (Jim)', '', 'Altamonte Springs', '(407) 830-1400', '', '745 Orienta Ave Suite 1121', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (536, 'nstoehr@forumarchitecture.com', 'Stoehr, Norman R.', 1782235932, 'active', '', 'Forum Architecture', 'Partner / President', 'Stoehr,', 'Norman R.', '', '', '(407) 830-1400', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (537, 'jszabo@forumarchitecture.com', 'Vikre, Jennifer', 1782235933, 'active', '', 'Forum Architecture', 'Admin Assit.', 'Vikre,', 'Jennifer', '', '', '(407) 830-1400', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (538, 'twells@forumarchitecture.com', 'Wells, Tracey', 1782235933, 'active', '', 'Forum Architecture', 'H.R Manager', 'Wells,', 'Tracey', '', '', '(407) 830-1400', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (539, 'mfox@fox-arch.com', 'Fox, Michael', 1782235934, 'active', '', 'FOX Architects', 'CEO', 'Fox,', 'Michael', '', '', '(202) 659-0929', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (540, 'cburbano@gea-pllc.com', 'Burbano, Carlos', 1782235935, 'active', '', 'Glickman', 'Principal Electrical Engineering', 'Burbano,', 'Carlos', '', 'New York', '(212) 643-8006', '', '545 Eighth Avenue', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (541, 'dglickman@gea-pllc.com', 'Glickman, David', 1782235935, 'active', '', 'Glickman', 'Principal', 'Glickman,', 'David', '', 'New York', '(212) 643-8006', '', '545 Eighth Avenue', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (542, 'kristen@gea-pllc.com', 'Occhiogrosso, Kristen', 1782235936, 'active', '', 'Glickman', 'HR Assistant', 'Occhiogrosso,', 'Kristen', '', 'New York', '(212) 643-8006', '', '545 Eighth Avenue', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (543, 'aresto@gea-pllc.com', 'Resto, Andrea', 1782235936, 'active', '', 'Glickman', 'Dir. Marketing & Finance', 'Resto,', 'Andrea', '', 'New York', '(212) 643-8006', '', '545 Eighth Avenue', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (544, 'jaizenberg@goldmancopeland.com', 'Aizenberg, Joanne', 1782235937, 'active', '', 'Goldman Copeland Asssociates', 'Office Manager', 'Aizenberg,', 'Joanne', '', 'New York', '(212) 868-4660', '', '520 8th Avenue, Ninth Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (545, 'dcolombini@goldmancopeland.com', 'Colombini, Dan', 1782235938, 'active', '', 'Goldman Copeland Asssociates', 'Plumbing & Fire Protection Director', 'Colombini,', 'Dan', '', 'New York', '(914) 584-5127', '', '520 8th Avenue, Ninth Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (546, 'ccopeland@goldmancopeland.com', 'Copeland, Charlie', 1782235938, 'active', '', 'Goldman Copeland Asssociates', 'President', 'Copeland,', 'Charlie', '', 'New York', '(212) 868-4660 x240', '', '520 8th Avenue, Ninth Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (547, 'hholowitz@goldmancopeland.com', 'Holowitz, Howard', 1782235939, 'active', '', 'Goldman Copeland Asssociates', 'Sr. VP & Partner', 'Holowitz,', 'Howard', '', 'New York', '(212) 868-4660 x238', '', '520 8th Avenue, Ninth Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (548, 'jmcbride@goldmancopeland.com', 'McBride, John', 1782235940, 'active', '', 'Goldman Copeland Asssociates', 'Dir. Electrical Engineering PE', 'McBride,', 'John', '', 'New York', '(212) 868-4660 x217', '', '520 8th Avenue, Ninth Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (549, 'emitchell@goldmancopeland.com', 'Mitchell, Eric', 1782235940, 'active', '', 'Goldman Copeland Asssociates', 'VP Of Mechanical', 'Mitchell,', 'Eric', '', 'New York', '(917) 445-1910', '', '520 8th Avenue, Ninth Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (550, 'jcowgill@hazenandsawyer.com', 'Cowgill, James (Jim)', 1782235941, 'active', '', 'Hazen Sawyer', 'Vp', 'Cowgill,', 'James (Jim)', '', 'Hollywood', '(954) 987-0066', '', '4000 Hollywood Blvd.', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (551, 'agregson@hazenandsawyer.com', 'Gregson, Andy', 1782235941, 'active', '', 'Hazen Sawyer', 'VP DC & VA Office', 'Gregson,', 'Andy', '', 'Hollywood', '(703) 267-2734', '', '4000 Hollywood Blvd.', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (552, 'smehrotra@hazenandsawyer.com', 'Mehrotra, Sandeep', 1782235942, 'active', '', 'Hazen Sawyer', 'SVP In Charge Of NYC', 'Mehrotra,', 'Sandeep', '', 'Hollywood', '(917) 842-579', '', '498 Seventh Avenue, 11th Floor', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (553, 'psaurer@hazenandsawyer.com', 'Saurer, Paul', 1782235943, 'active', '', 'Hazen Sawyer', 'Vice President', 'Saurer,', 'Paul', '', 'Hollywood', '(212) 539-7076', '', '498 Seventh Avenue, 11th Floor', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (554, 'rltaylor@hazenandsawyer.com', 'Taylor, Ron', 1782235943, 'active', '', 'Hazen Sawyer', 'Sr. Vice President', 'Taylor,', 'Ron', '', 'Hollywood', '(919) 755-8601', '', '498 Seventh Avenue, 11th Floor', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (555, 'pyoung@hazenandsawyer.com', 'Young, Peter', 1782235944, 'active', '', 'Hazen Sawyer', 'Vice President', 'Young,', 'Peter', '', 'Hollywood', '(917) 613-4413', '', '498 Seventh Avenue, 11th Floor', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (556, 'dwood@helixelectric.com', 'Dave Wood', 1782235945, 'active', '', 'Helix Electric', 'Vice President', 'Dave', 'Wood', '', 'Las Vegas', '', '', '', 'NV', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (557, 'kemma@helixelectric.com', 'Konstantin "Ken" Emma', 1782235945, 'active', '', 'Helix Electric', 'Vice President', 'Konstantin', '"Ken" Emma', '', 'San Diego', '', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (558, 'mcripe@cox.net', 'Brady Hill', 1782235946, 'active', '', 'Helix Electric', 'Vice President', 'Brady', 'Hill', '', 'Washington', '', '', '', 'DC', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (559, 'rcayton@helixelectric.com', 'Ronald Cayton', 1782235947, 'active', '', 'Helix Electric', 'Vice President', 'Ronald', 'Cayton', '', 'Washington', '', '', '', 'DC', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (560, 'sgolden@hga.com', 'Golden, Suzanne', 1782235947, 'active', '', 'HGA', 'Senior HR Associate', 'Golden,', 'Suzanne', '', 'San Jose', '(703) 836-7766', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (561, 'george_s_lin@yahoo.com', 'Lin, George', 1782235948, 'active', '', 'HGA', 'Vice-President, Senior Project Manager', 'Lin,', 'George', '', 'Alexandria', '', '', '44 Canal Center Plaza, Suite 100', 'VA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (562, 'hnathanson@hga.com', 'Nathanson, Hugh', 1782235948, 'active', '', 'HGA', 'Associate Vice President', 'Nathanson,', 'Hugh', '', 'Santa Monica', '(703) 836-7766', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (563, 'jpeschl@hga.com', 'Peschl, Jim', 1782235949, 'active', '', 'HGA', 'Associate Vice President', 'Peschl,', 'Jim', '', 'Santa Monica', '(703) 836-7766', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (564, 'broach@hga.com', 'Roach, Brenda', 1782235950, 'active', '', 'HGA', 'West Coast - HR Manager', 'Roach,', 'Brenda', '', 'Sacramento', '(703) 836-7766', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (565, 'steshima@hga.com', 'Teshima, Satoshi', 1782235950, 'active', '', 'HGA', 'Associate Vice President', 'Teshima,', 'Satoshi', '', 'Santa Monica', '(703) 836-7766', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (566, 'nalexander@hksinc.com', 'Alexander, Neil', 1782235951, 'active', '', 'HKS', 'Associate Principal', 'Alexander,', 'Neil', '', 'Austin', '', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (567, 'eantalek@hksinc.com', 'Antalek, Eric', 1782235952, 'active', '', 'HKS', 'Sr Vice President', 'Antalek,', 'Eric', '', 'Orlando', '', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (568, 'cbeers@hksinc.com', 'Beers, Carl', 1782235952, 'active', '', 'HKS', 'Sr VP', 'Beers,', 'Carl', '', 'Tampa', '(407) 648-9956', '', '5401 W. Kennedy Blvd.', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (569, 'jbuskuhl@hksinc.com', 'Buskuhl, Joe', 1782235953, 'active', '', 'HKS', 'President', 'Buskuhl,', 'Joe', '', 'Tampa', '(813) 287-2140', '', '5401 W. Kennedy Blvd.', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (570, 'nbutler@hksinc.com', 'Butler, Nathan', 1782235953, 'active', '', 'HKS', 'Vice President', 'Butler,', 'Nathan', '', '', '(407) 423-0098', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (571, '(jca) sti-llo@ hksinc.com', 'Castillo, Jamie', 1782235954, 'active', '', 'HKS', 'Director Of Healthcare Interiors Dallas', 'Castillo,', 'Jamie', '', 'Tampa', '', '', '5401 W. Kennedy Blvd.', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (572, 'mclear@hksinc.com', 'Clear, Matt', 1782235955, 'active', '', 'HKS', 'Vp.', 'Clear,', 'Matt', '', 'Tampa', '(407) 648-9956', '', '5401 W. Kennedy Blvd.', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (573, 'sevans@hksinc.com', 'Evans, Steve', 1782235955, 'active', '', 'HKS', 'H.R Director', 'Evans,', 'Steve', '', 'Tampa', '(407) 648-9956', '', '5401 W. Kennedy Blvd.', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (574, 'rgover@hksinc.com', 'Gover, Ron', 1782235956, 'active', '', 'HKS', 'Partner', 'Gover,', 'Ron', '', 'Dallas', '(813) 287-2140', '', '1919 Mckinney Ave', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (575, 'dharper@hksinc.com', 'Harper, David', 1782235957, 'active', '', 'HKS', 'Principal', 'Harper,', 'David', '', 'Tampa', '', '', '5401 W. Kennedy Blvd.', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (576, 'tharvey@hksinc.com', 'Harvey, Tom', 1782235957, 'active', '', 'HKS', 'Director', 'Harvey,', 'Tom', '', '', '(303) 293-2903', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (577, 'jhill@hksinc.com', 'Hill, Jeff', 1782235958, 'active', '', 'HKS', 'Senior Vice President Of Architecture', 'Hill,', 'Jeff', '', 'Tampa', '(813) 287-2140', '', '100 N. Tampa Street', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (578, 'bjohnson@hksinc.com', 'Johnson, Bruce', 1782235958, 'active', '', 'HKS', 'Sr VP', 'Johnson,', 'Bruce', '', 'Dallas', '(214) 969-5599', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (579, 'mjones@hksinc.com', 'Jones, Mark', 1782235959, 'active', '', 'HKS', 'COO', 'Jones,', 'Mark', '', 'Tampa', '(813) 287-2140', '', '5401 W. Kennedy Blvd.', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (580, 'mattkennedy@hks.com', 'Kennedy, Matthew', 1782235960, 'active', '', 'HKS', 'Vice President', 'Kennedy,', 'Matthew', '', 'Northville', '', '', '235 East Main Street', 'MI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (581, 'dnoble@hksinc.com', 'Noble, Dan', 1782235960, 'active', '', 'HKS', 'Director Healthcare Design Dallas, TX', 'Noble,', 'Dan', '', 'Tampa', '(214) 683-7770', '', '5401 W. Kennedy Blvd.', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (582, 'jschroer@hksinc.com', 'Schroer, Jason', 1782235961, 'active', '', 'HKS', 'Director', 'Schroer,', 'Jason', '', '', '(713) 380-6062', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (583, 'mvandervoort@hksinc.com', 'VanderVoort, Mark', 1782235962, 'active', '', 'HKS', 'Chairman', 'VanderVoort,', 'Mark', '', 'Tampa', '', '', '5401 W. Kennedy Blvd.', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (584, 'tim.foley@ibigroup.com', 'Foley, Tim', 1782235962, 'active', '', 'IBI Group', 'Regional Director', 'Foley,', 'Tim', '', 'Columbus', '(407) 660-2120', '', '', 'OH', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (585, 'linda.gauld@ibigroup.com', 'Gauld, Linda', 1782235963, 'active', '', 'IBI Group', 'Senior Recruiter', 'Gauld,', 'Linda', '', '', '(407) 660-2120', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (586, 'kristen.mclain@ibigroup.com', 'McLain, Kristen', 1782235963, 'active', '', 'IBI Group', 'Recruitment Manager', 'McLain,', 'Kristen', '', '', '(416) 596-1930', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (587, 'jnewton@ccl-orlando.com', 'Newton, Jeff', 1782235964, 'active', '', 'IBI Group', 'Dir. Of Eng.', 'Newton,', 'Jeff', '', 'Maitland', '(407) 468-3644', '', '2603 Maitland Center Pkwy.', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (588, 'dperron@ibigroup.com', 'Perron, Desiree', 1782235965, 'active', '', 'IBI Group', 'HR Business Partner', 'Perron,', 'Desiree', '', 'Pompano Beach', '(407) 660-2120', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (589, 'wway@ibigroup.com', 'Way, Willson', 1782235965, 'active', '', 'IBI Group', 'Partner Sr. Civil PE', 'Way,', 'Willson', '', 'Maitland', '(954) 974-2200', '', '2603 Maitland Center Pkwy.', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (590, 'pwilliams@ibigroup.com', 'Williams, Paul', 1782235966, 'active', '', 'IBI Group', 'Associate Director - Practice Lead, Electrical & Mechanical Engineering', 'Williams,', 'Paul', '', 'Maitland', '416-) 679-1930', '', '2603 Maitland Center Pkwy.', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (591, 'bienstock@icorassociates.com', 'Bienstock, Igor', 1782235967, 'active', '', 'Icor', 'Principal', 'Bienstock,', 'Igor', '', 'New York', '(732) 781-1105', '', '256 West 38th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (592, 'oskwarek@icorassociates.com', 'Oskwarek, John', 1782235967, 'active', '', 'Icor', 'Principal', 'Oskwarek,', 'John', '', 'New York', '(212) 994-9593', '', '256 West 38th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (593, 'sabo@icorassociates.com', 'Sabo, Wayne', 1782235968, 'active', '', 'Icor', 'Principal', 'Sabo,', 'Wayne', '', 'New York', '(732) 781-1109', '', '256 West 38th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (594, 'kmartin@interprisedesign.com', 'Martin, Karyn', 1782235968, 'active', '', 'Interprise Design', 'President & COO', 'Martin,', 'Karyn', '', 'Dallas', '(972) 385-3991', '', '5080 Spectrum Drive', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (595, 'jim.bisbee@kimley-horn.com', 'Bisbee, Jim', 1782235969, 'active', '', 'Kimley-Horn & Associates, Inc', 'Senior Recruiter', 'Bisbee,', 'Jim', '', 'Austin', '(561) 840-0206', '', '10814 Jollyville Road', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (596, 'mona.christie@kimley-horn.com', 'Christie, Mona', 1782235970, 'active', '', 'Kimley-Horn & Associates, Inc', 'Principal', 'Christie,', 'Mona', '', 'Austin', '(561) 840-0218', '', '10814 Jollyville Road', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (597, 'jjackson@kimley-horn.com', 'Jackson, Jay', 1782235970, 'active', '', 'Kimley-Horn & Associates, Inc', 'VP Civil Engineering', 'Jackson,', 'Jay', '', 'Austin', '(407) 898-1511', '', '10814 Jollyville Road', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (598, 'rubright@kmd-arch.com', 'Rubright, Chris', 1782235971, 'active', '', 'Kmd Architects', 'Principal', 'Rubright,', 'Chris', '', 'San Francisco', '(206) 812-5612', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (599, 'kavinder@kmd-arch.com', 'Singh, Kavinder', 1782235972, 'active', '', 'Kmd Architects', 'President', 'Singh,', 'Kavinder', '', 'San Francisco', '', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (600, 'mark.madorsky@leafengineers.com', 'Mark Madorsky', 1782235972, 'active', '', 'LEAF Engineering', 'President', 'Mark', 'Madorsky', '', 'Houston', '', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (601, 'joe.daher@pbk.com', 'Joe Daher', 1782235973, 'active', '', 'LEAF Engineering', 'Director', 'Joe', 'Daher', '', 'San Antonio', '', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (602, 'psvay@comcast.net', 'Phaly Svay', 1782235973, 'active', '', 'LEAF Engineering', 'Director', 'Phaly', 'Svay', '', 'Houston', '', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (603, 'wreckswang@gmail.com', 'Rex Wang', 1782235974, 'active', '', 'LEAF Engineering', 'Director, Licensed PE skilled in MEP Design', 'Rex', 'Wang', '', 'Los Angeles', '', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (604, 'jbaker@lilkeremo.com', 'Baker, Justin', 1782235975, 'active', '', 'Lilker', 'Vice President', 'Baker,', 'Justin', '', 'New York', '(724) 554-7010', '', '1001 Avenue Of The Americas, FL 9', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (605, 'blilker@lilker.com', 'Bruce Lilker', 1782235975, 'active', '', 'Lilker', 'President, PE, LEED AP', 'Bruce', 'Lilker', '', 'New York', '(516) 456-5000', '', '1001 Avenue Of The Americas, FL 9', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (606, 'sbudzyn@lilker.com', 'Budzyn, Serge', 1782235976, 'active', '', 'Lilker', 'Executive VP. Electrical PE', 'Budzyn,', 'Serge', '', 'New York', '(212) 695-1000', '', '1001 Avenue Of The Americas, FL 9', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (607, 'mleonick@lilker.com', 'Leonick, Michael', 1782235977, 'active', '', 'Lilker', 'Principal PE Electrical Dep. Head', 'Leonick,', 'Michael', '', 'New York', '(516) 640-8374', '', '1001 Avenue Of The Americas, FL 9', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (608, 'llicameli@lilker.com', 'Licameli, Louis', 1782235977, 'active', '', 'Lilker', 'Dir. Of Engineering Long Island', 'Licameli,', 'Louis', '', 'New York', '(516) 433-1500 x406', '', '1001 Avenue Of The Americas, FL 9', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (609, 'eoliver@lilkeremo.com', 'Oliver, Eric', 1782235978, 'active', '', 'Lilker', 'Managing Director DC', 'Oliver,', 'Eric', '', 'New York', '(703) 655-0228', '', '1001 Avenue Of The Americas, FL 9', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (610, 'jrivera@lilker.com', 'Rivera, Jose', 1782235978, 'active', '', 'Lilker', 'Director Plumbing & Fire Protection Department, PE, LEED AP', 'Rivera,', 'Jose', '', 'New York', '(212) 695-1000 x244', '', '1001 Avenue Of The Americas, FL 9', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (611, 'dtanenbaum@lilker.com', 'Tanenbaum, David', 1782235979, 'active', '', 'Lilker', 'Mechanical SVP Principal PE', 'Tanenbaum,', 'David', '', 'New York', '(212) 695-1000 x229', '', '1001 Avenue Of The Americas, FL 9', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (612, 'agcasey@meengineering.com', 'Casey, Allen G.', 1782235980, 'active', '', 'M/E Engineering', 'President', 'Casey,', 'Allen G.', '', 'Rochester', '(585) 288-5590', '', '150 North Chestnut Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (613, 'wpliberto@meengineering.com', 'Liberto, Bill', 1782235980, 'active', '', 'M/E Engineering', 'Manager (Buffalo Office)', 'Liberto,', 'Bill', '', 'Buffalo', '(716) 845-5092', '', '60 Lakefront Boulevard', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (614, 'rcmead@meengineering.com', 'Mead, Ronald', 1782235981, 'active', '', 'M/E Engineering', 'SVP  Rochester', 'Mead,', 'Ronald', '', 'Rochester', '(585) 288-5590 Ext. 326', '', '150 North Chestnut Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (615, 'cjpuffer@meengineering.com', 'Puffer, Calvin', 1782235982, 'active', '', 'M/E Engineering', 'Manager (Buffalo Office)', 'Puffer,', 'Calvin', '', 'Buffalo', '(716) 845-5092', '', '150 North Chestnut Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (616, 'cjschnegg@meengineering.com', 'Schneggenburger, Candice', 1782235982, 'active', '', 'M/E Engineering', 'Human Resource Manager', 'Schneggenburger,', 'Candice', '', 'Rochester', '(585) 288-0233', '', '150 North Chestnut Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (617, 'fjstraub@meengineering.com', 'Straub, Joseph', 1782235983, 'active', '', 'M/E Engineering', 'SVP Albany', 'Straub,', 'Joseph', '', 'Albany', '(518) 533-2171 ext 412', '', '150 North Chestnut Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (618, 'mksullivan@meengineering.com', 'Sullivan, Michael', 1782235983, 'active', '', 'M/E Engineering', 'Partner', 'Sullivan,', 'Michael', '', 'Schenectady', '(518) 821-7428', '', '433 State Street, Suite 410', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (619, 'lrondon@maparchitects.com', 'Rondon, Lisa', 1782235984, 'active', '', 'Magnusson Architecture', 'Director Of Administration', 'Rondon,', 'Lisa', '', 'New York', '(212) 253-7820 x5665', '', '42 West 39th Street 15th Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (620, 'rlemast1@gmail.com', 'Lemaster_Jr., Raymond', 1782235985, 'active', '', 'MAAMECH', 'Vice President Of Engineering', 'Lemaster_Jr.,', 'Raymond', '', 'Parkton', '(443) 690-1578', '', '331 Stablers Church Road', 'MD', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (621, 'khorena@mazzetti.com', 'Abrahamian, Khoren', 1782235985, 'active', '', 'Mazzetti+GBA', 'Principal', 'Abrahamian,', 'Khoren', '', 'Irvine', '(949) 475-5550', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (622, 'karla@mazzetti.com', 'Atteberry, Karl', 1782235986, 'active', '', 'Mazzetti+GBA', 'Principal', 'Atteberry,', 'Karl', '', 'Portland', '(503) 620-3232', '', '', 'OR', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (623, 'timb@mazzetti.com', 'Belke, Tim', 1782235987, 'active', '', 'Mazzetti+GBA', 'Principal', 'Belke,', 'Tim', '', 'Sacramento', '(916) 979-4890', '', '3600 American River Drive', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (624, 'philg@mazzetti.com', 'Gioia, Phil', 1782235987, 'active', '', 'Mazzetti+GBA', 'Denver Principal, PE, LEED AP, CxA', 'Gioia,', 'Phil', '', 'Denver', '(303) 589-3938', '', '', 'CO', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (625, 'jinman@mazzetti.com', 'Inman, Jon', 1782235988, 'active', '', 'Mazzetti+GBA', 'Principal', 'Inman,', 'Jon', '', 'San Francisco', '(415) 364-7248', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (626, 'dlennon@mazzetti.com', 'Lennon, David', 1782235989, 'active', '', 'Mazzetti+GBA', 'Principal', 'Lennon,', 'David', '', 'Brentwood', '(615) 329-4460', '', '', 'TN', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (627, 'dmoeller@mazzetti.com', 'Moeller, Dick', 1782235989, 'active', '', 'Mazzetti+GBA', 'Principal', 'Moeller,', 'Dick', '', 'Seattle', '(425) 672-1071', '', '19203 36th Avenue W', 'WA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (628, 'johnp@mazzetti.com', 'Pappas, John', 1782235990, 'active', '', 'Mazzetti+GBA', 'Principal', 'Pappas,', 'John', '', 'San Francisco', '(415) 362-3266', '', '220 Montgomery Street', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (629, 'srossberg@mazzetti.com', 'Rossberg, Sue', 1782235990, 'active', '', 'Mazzetti+GBA', 'Human Resources Manager', 'Rossberg,', 'Sue', '', 'Denver', '(720) 644-5648', '', '1600 Stout Street, Suite 450', 'CO', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (630, 'mstavig@mazzetti.com', 'Stavig, Mark', 1782235991, 'active', '', 'Mazzetti+GBA', 'Principal', 'Stavig,', 'Mark', '', 'Seattle', '(425) 672-1071', '', '', 'WA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (631, 'jdthompson@mazzetti.com', 'Thompson, J.D.', 1782235992, 'active', '', 'Mazzetti+GBA', 'Associate Principal', 'Thompson,', 'J.D.', '', 'Houston', '(281) 480-5560', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (632, 'pjones@mazzetti.com', 'Thompson, Peti Jones', 1782235992, 'active', '', 'Mazzetti+GBA', 'Associate Principal', 'Thompson,', 'Peti Jones', '', 'Houston', '(281) 480-5560', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (633, 'walterv@mazzetti.com', 'Vernonv, Walt', 1782235993, 'active', '', 'Mazzetti+GBA', 'Principal & CEO', 'Vernonv,', 'Walt', '', 'San Francisco', '(415) 364-7222', '', '220 Montgomery Street', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (634, 'asullivan@mcsal.com', 'Sullivan, Andy', 1782235994, 'active', '', 'McNamara Salvia', 'Principal', 'Sullivan,', 'Andy', '', 'Miami', '(305) 579-5765', '', 'One Biscayne Tower, Suite 3795', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (635, 'salvia@mcsal.com', 'Joseph Salvia', 1782235994, 'active', '', 'McNamara Salvia', 'Principal', 'Joseph', 'Salvia', '', 'Boston', '', '', '', 'MA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (636, 'tsatkevich@mcsal.com', 'Tom Satkevich', 1782235995, 'active', '', 'McNamara Salvia', 'Principal', 'Tom', 'Satkevich', '', 'Quincy', '', '', '', 'MA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (637, 'scampagna@mcveighmangum.com', 'Campagna, Scott', 1782235995, 'active', '', 'McVeigh & Mangum', 'VP/ Managing Director', 'Campagna,', 'Scott', '', 'Charlotte', '(704) 547-9035', '', '1610 East Morehead Street', 'NC', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (638, 'wmangum@mcveighmangum.com', 'Mangum, Wayne', 1782235996, 'active', '', 'McVeigh & Mangum', 'Principal', 'Mangum,', 'Wayne', '', 'Jacksonville', '(904) 483-5200', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (639, 'cmcveigh@mcveighmangum.com', 'McVeigh, Carrington', 1782235997, 'active', '', 'McVeigh & Mangum', 'CEO', 'McVeigh,', 'Carrington', '', 'Charlotte', '(704) 547-9035', '', '1610 East Morehead Street', 'NC', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (640, 'tnielsen@mcveighmangum.com', 'Nielsen, Thomas', 1782235997, 'active', '', 'McVeigh & Mangum', 'Sr. VP Electrical Jacksonville', 'Nielsen,', 'Thomas', '', 'Charlotte', '(704) 547-9035', '', '1610 East Morehead Street', 'NC', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (641, 'dporter@mcveighmangum.com', 'Porter, Donna', 1782235998, 'active', '', 'McVeigh & Mangum', 'Hr', 'Porter,', 'Donna', '', 'Charlotte', '(704) 547-9035', '', '1610 East Morehead Street', 'NC', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (642, 'aluottos@nkarchitects.com', 'Aluotto, Stephen', 1782235999, 'active', '', 'NK Architects', 'Principal', 'Aluotto,', 'Stephen', '', 'New York', '(201) 412-7168', '', '116 John Street Suite 2500 New York', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (643, 'dragop@nkarchitects.com', 'Drago, Paul', 1782235999, 'active', '', 'NK Architects', 'NYC Studio Director', 'Drago,', 'Paul', '', 'New York', '(973) 539-5353', '', '116 John Street Suite 2500 New York', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (644, 'kneisw@nkarchitects.com', 'Kneis, Walter', 1782236000, 'active', '', 'NK Architects', 'Principal', 'Kneis,', 'Walter', '', 'New York', '(973) 532-7725', '', '116 John Street Suite 2500 New York', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (645, 'kopelsona@nkarchitects.com', 'Kopelson, Allen', 1782236000, 'active', '', 'NK Architects', 'Founding Principal', 'Kopelson,', 'Allen', '', 'New York', '(973) 539-5353', '', '116 John Street Suite 2500 New York', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (646, 'toppingd@nkarchitects.com', 'Topping, Dan', 1782236001, 'active', '', 'NK Architects', 'Principal', 'Topping,', 'Dan', '', 'New York', '(973) 539-5353', '', '116 John Street Suite 2500 New York', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (647, 'mjf927@aol.com', 'Mary Jean Flannery', 1782236002, 'active', '', 'NORR', 'Accounting Manager/Controller', 'Mary', 'Jean Flannery', '', 'Philadelphia', '', '', '', 'PA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (648, 'hamilton22@earthlink.net', 'Steven Kopp', 1782236002, 'active', '', 'NORR', 'Principal', 'Steven', 'Kopp', '', 'Philadelphia', '(407) 661-9100', '', '', 'PA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (649, 'coreen.paul@norr.com', 'Coreen Paul', 1782236003, 'active', '', 'NORR', 'Vice President', 'Coreen', 'Paul', '', 'Sacramento', '', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (650, 'peteradubin@gmail.com', 'Peter Dubin', 1782236004, 'active', '', 'NORR', 'Vice President', 'Peter', 'Dubin', '', 'Chicago', '', '', '', 'IL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (651, 'william.westhafer@norr.com', 'William Westhafer', 1782236004, 'active', '', 'NORR', 'Vice President', 'William', 'Westhafer', '', 'Philadelphia', '(215) 525-4849', '', '', 'PA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (652, 'gerstmar@gmail.com', 'Brian Gerstmar', 1782236005, 'active', '', 'NORR', 'President and Chief Executive Officer', 'Brian', 'Gerstmar', '', 'Toronto, Ontario', '', '', '', 'Canada', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (653, 'frank.panici@norr.com', 'Frank Panici', 1782236005, 'active', '', 'NORR', 'Vice President', 'Frank', 'Panici', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (654, 'jkohlhas@environetics-pa.com', 'John Kohlhas', 1782236006, 'active', '', 'NORR', 'Principal / Director of Operations', 'John', 'Kohlhas', '', 'Philadelphia', '(713) 850-9600', '', '', 'PA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (655, 'ryoko@oda-architecture.com', 'Okada, Ryoko', 1782236007, 'active', '', 'ODA', 'Principal', 'Okada,', 'Ryoko', '', 'New York', '(646) 673-1707', '', '250 Park Avenue South, Third Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (656, 'christian.agulles@pae-engineers.com', 'Agulles, Christian', 1782236007, 'active', '', 'PAE', 'Managing Principal', 'Agulles,', 'Christian', '', 'San Fransisco', '(415) 767-2716', '', '425 California St., Ste. 1200', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (657, 'scott.bevan@pae-engineers.com', 'Bevan, Scott', 1782236008, 'active', '', 'PAE', 'Principal', 'Bevan,', 'Scott', '', 'Portland', '(503) 477-2484', '', '522 SW 5th Avenue, Suite 1500', 'OR', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (658, 'margo.botti@pae-engineers.com', 'Botti, Margo', 1782236009, 'active', '', 'PAE', 'Human Resources Assistant', 'Botti,', 'Margo', '', 'Seattle', '(503) 444-5445', '', '522 SW 5th Avenue, Suite 1500', 'OR', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (659, 'allan.montpellier@pae-engineers.com', 'Montpellier, Allan', 1782236009, 'active', '', 'PAE', 'Principal', 'Montpellier,', 'Allan', '', 'Seattle', '(617) 877-9516', '', '1501 East Madison Street', 'WA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (660, 'grant.parthemer@pae-engineers.com', 'Parthemer, Grant', 1782236010, 'active', '', 'PAE', 'Principal', 'Parthemer,', 'Grant', '', 'Portland', '(503) 515-8042', '', '522 SW 5th Avenue, Suite 1500', 'OR', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (661, 'steve.reidy@pae-engineers.com', 'Reidy, Steven', 1782236011, 'active', '', 'PAE', 'Managing Principal', 'Reidy,', 'Steven', '', 'Seattle', '(503) 708-3782', '', '522 SW 5th Avenue, Suite 1500', 'OR', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (662, 'stephen.turina@pae-engineers.com', 'Turina, Stephen', 1782236011, 'active', '', 'PAE', 'Principal', 'Turina,', 'Stephen', '', 'Portland', '(503) 226-2921', '', '522 SW 5th Avenue, Suite 1500', 'OR', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (663, 'abaxter@pagethink.com', 'Baxter, Andy', 1782236012, 'active', '', 'Page Southerland Page OR Page Think', 'Director Of MEP', 'Baxter,', 'Andy', '', 'Houston', '(512) 472-6721 (x 3428)', '', '1100 Louisiana Suite One', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (664, 'bburke@pspaec.com', 'Burke, Bob', 1782236012, 'active', '', 'Page Southerland Page OR Page Think', 'Vice President', 'Burke,', 'Bob', '', 'Austin', '(512) 472-6721', '', '400 Cesar Chavez St', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (665, 'bcarroll@pagethink.com', 'Carroll, Beth', 1782236013, 'active', '', 'Page Southerland Page OR Page Think', 'Principal', 'Carroll,', 'Beth', '', 'Dallas', '(214) 522-3900', '', '1800 Main Street', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (666, 'jcryer@pspaec.com', 'Cryer, John', 1782236014, 'active', '', 'Page Southerland Page OR Page Think', 'Managing Principal', 'Cryer,', 'John', '', 'Houston', '(713) 871-8484', '', '1100 Louisiana', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (667, 'rdoane@pspaec.com', 'Doane, Robert', 1782236014, 'active', '', 'Page Southerland Page OR Page Think', 'Principal', 'Doane,', 'Robert', '', 'Dallas', '(214) 522-3900', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (668, 'mflabiano@pspaec.com', 'Flabiano, Mattia', 1782236015, 'active', '', 'Page Southerland Page OR Page Think', 'Managing Principal Dallas', 'Flabiano,', 'Mattia', '', '', '(214) 522-3900', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (669, 'wheger@pagethink.com', 'Heger, Wendy', 1782236016, 'active', '', 'Page Southerland Page OR Page Think', 'Associate Principal', 'Heger,', 'Wendy', '', 'Houston', '(713) 871-8484', '', '1100 Louisiana Suite One', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (670, 'peterbhoffmann@gmail.com', 'Hoffman, Peter', 1782236016, 'active', '', 'Page Southerland Page OR Page Think', 'Associate Principal', 'Hoffman,', 'Peter', '', 'Austin', '(512) 472-6721', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (671, 'jhuffhines@pagethink.com', 'Huffhines, JJ', 1782236017, 'active', '', 'Page Southerland Page OR Page Think', 'Vice President', 'Huffhines,', 'JJ', '', 'Austin', '(512) 472-6721', '', '400 Cesar Chavez St', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (672, 'skook@pagethink.com', 'Kook, Steve', 1782236017, 'active', '', 'Page Southerland Page OR Page Think', 'Director Healthcare', 'Kook,', 'Steve', '', 'Denver', '(303) 595-0491', '', '', 'CO', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (673, 'ekuehmeier@pspaec.com', 'Kuehmeier, Eric', 1782236018, 'active', '', 'Page Southerland Page OR Page Think', 'Associate Principal Dallas', 'Kuehmeier,', 'Eric', '', 'Austin', '(512) 472-6721', '', '400 Cesar Chavez St', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (674, 'clloyd@pspaec.com', 'Lloyd, Cliff', 1782236019, 'active', '', 'Page Southerland Page OR Page Think', 'Executive VP Dallas', 'Lloyd,', 'Cliff', '', 'Austin', '(512) 472-6721', '', '400 Cesar Chavez St', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (675, 'jmajor@pagethink.com', 'Major, John', 1782236019, 'active', '', 'Page Southerland Page OR Page Think', 'Principal', 'Major,', 'John', '', 'Houston', '', '', '1100 Louisiana Suite One', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (676, 'lmay@pspaec.com', 'May, Lewis', 1782236020, 'active', '', 'Page Southerland Page OR Page Think', 'Executive VP Houston', 'May,', 'Lewis', '', 'Austin', '(512) 472-6721', '', '400 Cesar Chavez St', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (677, 'bmay@pagethink.com', 'May, Robert', 1782236021, 'active', '', 'Page Southerland Page OR Page Think', 'Principal', 'May,', 'Robert', '', 'Dallas', '(214) 522-3900', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (678, 'gneubauer@pagethink.com', 'Neubauer, Garrett', 1782236021, 'active', '', 'Page Southerland Page OR Page Think', 'Principal', 'Neubauer,', 'Garrett', '', 'Houston', '(713) 871-8484', '', '1100 Louisiana Suite One', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (679, 'fpadilla@pagethink.com', 'Padilla, Freddy', 1782236022, 'active', '', 'Page Southerland Page OR Page Think', 'Principal', 'Padilla,', 'Freddy', '', 'Houston', '', '', '1100 Louisiana Suite One', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (680, 'drobinson@pagethink.com', 'Robinson, Dale', 1782236022, 'active', '', 'Page Southerland Page OR Page Think', 'Principal/ MEP Director', 'Robinson,', 'Dale', '', 'Dallas', '(214) 522-3900', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (681, 'lrosenfeld@pspaec.com', 'Rosenfeld, Lisa', 1782236023, 'active', '', 'Page Southerland Page OR Page Think', 'Director Human Resources', 'Rosenfeld,', 'Lisa', '', 'Dallas', '(214) 522-3900', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (682, 'lspeck@pagethink.com', 'Speck, Lawrence', 1782236024, 'active', '', 'Page Southerland Page OR Page Think', 'Senior Principal', 'Speck,', 'Lawrence', '', 'Austin', '', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (683, 'petestav@gmail.com', 'Stavenger, Peter', 1782236024, 'active', '', 'Page Southerland Page OR Page Think', 'Associate Principal', 'Stavenger,', 'Peter', '', 'Denver', '(515) 451-4345', '', '', 'CO', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (684, 'jtanner@pagethink.com', 'Tanner, James', 1782236025, 'active', '', 'Page Southerland Page OR Page Think', 'Principal', 'Tanner,', 'James', '', 'Dallas', '(214) 522-3900', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (685, 'jvaughan@pagethink.com', 'Vaughan, Jonathan', 1782236026, 'active', '', 'Page Southerland Page OR Page Think', 'Principal/Commissioning Director', 'Vaughan,', 'Jonathan', '', '', '(281) 740-7220', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (686, 'dan.boggio@pbk.com', 'Boggio, Daniel', 1782236026, 'active', '', 'PBK Architects', 'President', 'Boggio,', 'Daniel', '', 'Houston', '(713) 965-0608', '', 'Eleven Greenway Plaza', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (687, 'sbutler718@gmail.com', 'Butler, Stephen', 1782236027, 'active', '', 'PBK Architects', 'Director Of Plumbing', 'Butler,', 'Stephen', '', 'Houston', '(404) 932-1191', '', '11 Greenway Plaza, 22nd Floor', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (688, 'steven.dunn@pbk.com', 'Dunn, Steve', 1782236027, 'active', '', 'PBK Architects', 'Hr Dir', 'Dunn,', 'Steve', '', 'Houston', '(281) 384-5280', '', '11 Greenway Plaza, 22nd Floor', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (689, 'brian.hood@pbk.com', 'Hood, Brian', 1782236028, 'active', '', 'PBK Architects', 'Vice President, MEP', 'Hood,', 'Brian', '', 'Houston', '(713) 965-0608', '', '11 Greenway Plaza, 22nd Floor', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (690, 'greg.hughes@pbk.com', 'Hughes, Greg', 1782236029, 'active', '', 'PBK Architects', 'Principal Healthcare Leader', 'Hughes,', 'Greg', '', 'Houston', '(832) 453-9625', '', '11 Greenway Plaza, 22nd Floor', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (691, 'mark.madorsky@pbk.com', 'Madorsky, Mark', 1782236029, 'active', '', 'PBK Architects', 'President MEP Engineering', 'Madorsky,', 'Mark', '', 'Houston', '(713) 805-1405', '', 'Eleven Greenway Plaza', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (692, 'fred.montes@pbk.com', 'Montes, Fred', 1782236030, 'active', '', 'PBK Architects', 'Partner Dallas AIA, LEED AP BD+C', 'Montes,', 'Fred', '', 'Dallas', '(214) 529-0653', '', '14001 Dallas Parkway, Suite 400', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (693, 'cmseiley@leoadaly.com', 'Seiley, C. Mark', 1782236031, 'active', '', 'PBK Architects', 'Managing Principal', 'Seiley,', 'C. Mark', '', 'Houston', '(214) 526-1144', '', '11 Greenway Plaza, 22nd Floor', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (694, 'mark.seiley@pbk.com', 'Seiley, Mark', 1782236031, 'active', '', 'PBK Architects', 'Principal', 'Seiley,', 'Mark', '', 'Houston', '', '', '11 Greenway Plaza, 22nd Floor', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (695, 'jerry.theiss@pbk.com', 'Theiss, Jerry', 1782236032, 'active', '', 'PBK Architects', 'Director Human Resources', 'Theiss,', 'Jerry', '', 'Houston', '(713) 965-0608', '', '11 Greenway Plaza, 22nd Floor', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (696, 'jpopli@popligroup.com', 'Popli, Jay', 1782236033, 'active', '', 'Popli Design Group', 'Executive Vice President', 'Popli,', 'Jay', '', 'Penfield', '(585) 364-1603', '', '555 Penbrooke Drive', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (697, 'ompopli@popligroup.com', 'Popli, Om P.', 1782236033, 'active', '', 'Popli Design Group', 'President', 'Popli,', 'Om P.', '', 'Penfield', '(585) 388-2060', '', '555 Penbrooke Drive', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (698, 'theacock@psands.com', 'Heacock, Todd', 1782236034, 'active', '', 'Paulus, Sokolowski & Sartor (PS&S)', 'Executive Vice President', 'Heacock,', 'Todd', '', 'Warren', '(732) 560-9700', '', '67B Mountain Boulevard Extension', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (699, 'theim@psands.com', 'Heim, Tom', 1782236034, 'active', '', 'Paulus, Sokolowski & Sartor (PS&S)', 'Cfo', 'Heim,', 'Tom', '', 'Warren', '(732) 560-9700', '', '67B Mountain Boulevard Extension', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (700, 'nkamdar@psands.com', 'Kamdar, Nandita', 1782236035, 'active', '', 'Paulus, Sokolowski & Sartor (PS&S)', 'VP Of MEP', 'Kamdar,', 'Nandita', '', 'Warren', '(732) 560-9700', '', '67B Mountain Boulevard Extension', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (701, 'jmcdonald@psands.com', 'McDonald, Jamie', 1782236036, 'active', '', 'Paulus, Sokolowski & Sartor (PS&S)', 'Vice President HR', 'McDonald,', 'Jamie', '', 'Warren', '(732) 584-0213', '', '67B Mountain Boulevard Extension', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (702, 'eyoussef@psands.com', 'Youssef, Emad', 1782236036, 'active', '', 'Paulus, Sokolowski & Sartor (PS&S)', 'Senior VP', 'Youssef,', 'Emad', '', 'Warren', '(732) 560-9700', '', '67B Mountain Boulevard Extension', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (703, 'sberkow@siaacoustics.com', 'Berkow, Sam', 1782236037, 'active', '', 'RDA or Robert Derector Associates', 'Founder', 'Berkow,', 'Sam', '', 'New York', '(917) 930-1775', '', '19 West 44th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (704, 'brown@derector.com', 'Brown, Tom', 1782236038, 'active', '', 'RDA or Robert Derector Associates', 'Principal, AV', 'Brown,', 'Tom', '', 'New York', '(212) 764-7272', '', '19 West 44th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (705, 'degrazio@derector.com', 'DeGrazio, Robert', 1782236038, 'active', '', 'RDA or Robert Derector Associates', 'Principal, Security', 'DeGrazio,', 'Robert', '', 'New York', '(212) 764-7272', '', '19 West 44th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (706, 'derector@derector.com', 'Derector, Robert', 1782236039, 'active', '', 'RDA or Robert Derector Associates', 'Founder & Chairman', 'Derector,', 'Robert', '', 'New York', '(212) 764-7272', '', '19 West 44th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (707, 'marcf@derector.com', 'Feldman, Marc', 1782236039, 'active', '', 'RDA or Robert Derector Associates', 'Managing Partner, PE', 'Feldman,', 'Marc', '', 'New York', '(212) 764-7272', '', '19 West 44th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (708, 'ferguson@derector.com', 'Ferguson, Kim', 1782236040, 'active', '', 'RDA or Robert Derector Associates', 'Director, RDT', 'Ferguson,', 'Kim', '', 'New York', '(917) 952-0749', '', '19 West 44th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (709, 'guzzardo@rd-mc.com', 'Guzzardo, Steve', 1782236041, 'active', '', 'RDA or Robert Derector Associates', 'Commissioning Manager', 'Guzzardo,', 'Steve', '', 'New York', '(914) 714-5228', '', '19 West 44th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (710, 'jenkins@derector.com', 'Jenkins, Jack', 1782236041, 'active', '', 'RDA or Robert Derector Associates', 'Director Of Energy & Sustainability', 'Jenkins,', 'Jack', '', 'New York', '(917) 576-7947', '', '19 West 44th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (711, 'markoff@derector.com', 'Konikoff, Martin S.', 1782236042, 'active', '', 'RDA or Robert Derector Associates', 'Managing Partner PE', 'Konikoff,', 'Martin S.', '', 'New York', '(212) 764-7272', '', '19 West 44th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (712, 'lonigro@derector.com', 'Lonigro, Anthony', 1782236043, 'active', '', 'RDA or Robert Derector Associates', 'Managing Partner, PE', 'Lonigro,', 'Anthony', '', 'New York', '(917) 952-1680', '', '19 West 44th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (713, 'lynaugh@derector.com', 'Lynaugh, Tom', 1782236043, 'active', '', 'RDA or Robert Derector Associates', 'Principal, AV', 'Lynaugh,', 'Tom', '', 'New York', '(212) 764-7272', '', '19 West 44th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (714, 'pang@derector.com', 'Pang, Alfred', 1782236044, 'active', '', 'RDA or Robert Derector Associates', 'Partner, Sr. Mechanical Engineer, PE, Leed AP', 'Pang,', 'Alfred', '', 'New York', '(917) 952-2728', '', '19 West 44th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (715, 'turrisi@derector.com', 'Turrisi, Tom', 1782236044, 'active', '', 'RDA or Robert Derector Associates', 'Partner', 'Turrisi,', 'Tom', '', 'New York', '(917) 952-5758', '', '19 West 44th Street', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (716, 'max@rbarchitects.com', 'Brito, Max', 1782236045, 'active', '', 'Rhodes+Brito', 'Partner', 'Brito,', 'Max', '', 'Orlando', '(407) 648-7288', '', '901 E. Washington Street', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (717, 'ruffin@rbarchitects.com', 'Rhodes, Ruffin', 1782236046, 'active', '', 'Rhodes+Brito', 'Principal', 'Rhodes,', 'Ruffin', '', 'Orlando', '(407) 648-7288', '', '901 E. Washington Street', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (718, 'jacob_anderson@rlfae.com', 'Anderson, Jacob', 1782236046, 'active', '', 'RLF', 'Director Of Mechanical Engineering', 'Anderson,', 'Jacob', '', 'Winter Park', '(407) 647-1039', '', '145 Lincoln Ave', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (719, 'sanford_cohn@rlfae.com', 'Cohn, Sanford', 1782236047, 'active', '', 'RLF', 'Principal', 'Cohn,', 'Sanford', '', 'Winter Park', '(407) 647-1039', '', '145 Lincoln Ave', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (720, 'smh@rlfae.com', 'Hingten, Steve (Hinchen)', 1782236048, 'active', '', 'RLF', 'President', 'Hingten,', 'Steve (Hinchen)', '', 'Winter Park', '(407) 647-1039', '', '145 Lincoln Ave', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (721, 'steve_langston@rlfae.com', 'Langston, Steve', 1782236048, 'active', '', 'RLF', 'Director Of Design Principal', 'Langston,', 'Steve', '', 'Winter Park', '(407) 647-1039', '', '145 Lincoln Ave', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (722, 'ken_mason@rlfae.com', 'Mason, Kenny', 1782236049, 'active', '', 'RLF', 'Dir. Elec. Eng.', 'Mason,', 'Kenny', '', 'Winter Park', '(407) 647-1039', '', '145 Lincoln Ave', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (723, 'jhr@rlfae.com', 'Rogers, Jack', 1782236049, 'active', '', 'RLF', 'Principal', 'Rogers,', 'Jack', '', 'Winter Park', '(407) 647-1039', '', '145 Lincoln Ave', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (724, 'david_yates@rlfae.com', 'Yates, David', 1782236050, 'active', '', 'RLF', 'CFO/ Controler', 'Yates,', 'David', '', 'Winter Park', '(407) 647-1039', '', '145 Lincoln Ave', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (725, 'bob_yohe@rlfae.com', 'Yohe, Robert', 1782236051, 'active', '', 'RLF', 'Sr VP', 'Yohe,', 'Robert', '', 'Winter Park', '(407) 647-1039', '', '145 Lincoln Ave', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (726, 'dkipp@rossbar.com', 'Kipp, David', 1782236051, 'active', '', 'Ross & Baruzzini', 'Sr. Vice President', 'Kipp,', 'David', '', 'Orlando', '(407) 648-7446', '', '520 N Semoran Blvd. Ste 240', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (727, 'dmcateer@rossbar.com', 'McAteer, Dan', 1782236052, 'active', '', 'Ross & Baruzzini', 'New Orlando Head', 'McAteer,', 'Dan', '', 'Orlando', '(407) 648-7446 Work x105', '', '225 E Robinson St. Ste 550', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (728, 'cmeyers@rossbar.com', 'Meyers, Kathie', 1782236053, 'active', '', 'Ross & Baruzzini', 'Dir HR', 'Meyers,', 'Kathie', '', 'Orlando', '(407) 648-7446', '', '520 N Semoran Blvd. Ste 240', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (729, 'ctoder@rossbar.com', 'Craig Toder', 1782236053, 'active', '', 'Ross & Baruzzini', 'Chairman of the Board', 'Craig', 'Toder', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (730, 'jap@rossbar.com', 'Jeffrey Crawford', 1782236054, 'active', '', 'Ross & Baruzzini', 'Senior Vice President, Director of Higher Education & Research', 'Jeffrey', 'Crawford', '', 'St. Louis', '', '', '', 'MA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (731, 'sdimond@rossbar.com', 'Susan Dimond', 1782236054, 'active', '', 'Ross & Baruzzini', 'Director of Business Development', 'Susan', 'Dimond', '', 'Miami', '', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (732, 'mshea@rossbar.com', 'Shea, Mike', 1782236055, 'active', '', 'Ross & Baruzzini', 'Sr. Vice President', 'Shea,', 'Mike', '', 'Orlando', '(407) 648-7446', '', '520 N Semoran Blvd. Ste 240', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (733, 'bwhite@rossbar.com', 'White, Bob', 1782236056, 'active', '', 'Ross & Baruzzini', 'VP Of SE in Ft.Lad', 'White,', 'Bob', '', 'Orlando', '(407) 648-7446', '', '520 N Semoran Blvd. Ste 240', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (734, 'sheyla.conforte@scb.com', 'Conforte, Sheyla', 1782236056, 'active', '', 'SCB Architects (Solomon Cordwell Buenz)', 'Principal', 'Conforte,', 'Sheyla', '', 'Chicago', '(312) 896-1100', '', '625 N. Michigan Avenue', 'IL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (735, 'peter.noone@scb.com', 'Noone, Peter', 1782236057, 'active', '', 'SCB Architects (Solomon Cordwell Buenz)', 'Principal', 'Noone,', 'Peter', '', 'San Francisco', '', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (736, 'mcormia@scottcormia.com', 'Cormia, Matthew', 1782236058, 'active', '', 'Scott+Cormia', 'Owner', 'Cormia,', 'Matthew', '', 'Orlando', '', '', '429 S. Keller Rd. Suite #200', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (737, 'mramos@smwllc.com', 'Ramos, Mildred', 1782236058, 'active', '', 'Shen Milsom and Wilke LLC', 'HR Managing Principal', 'Ramos,', 'Mildred', '', '', '(212) 725-6800', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (738, 'jtonero@smwllc.com', 'Tonero, Jeffrey', 1782236059, 'active', '', 'Shen Milsom and Wilke LLC', 'Principal - Director Wash DC Office', 'Tonero,', 'Jeffrey', '', '', '(703) 243-6301', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (739, 'kmishler@southlandind.com', 'Mishler, Kim', 1782236059, 'active', '', 'Southland Industries', 'Hr', 'Mishler,', 'Kim', '', '', '(510) 828-1550', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (740, 'john.anthes@stantec.com', 'Anthes, John', 1782236060, 'active', '', 'Stantec All cities NO PULL!', 'Principal, Mechanical Engineer', 'Anthes,', 'John', '', 'New York', '(732) 778-5311', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (741, 'gbarrera@shwgroup.com', 'Barrera, Gloria', 1782236061, 'active', '', 'Stantec All cities NO PULL!', 'Human Resources', 'Barrera,', 'Gloria', '', 'Houston', '(713) 877-0900', '', '20 E. Greenway Plz  #825', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (742, 'joseph.bartels@stantec.com', 'Bartels, Joseph R.', 1782236061, 'active', '', 'Stantec All cities NO PULL!', 'Principal & Head Of CT Office', 'Bartels,', 'Joseph R.', '', 'New York', '(203) 328-1899', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (743, 'jeremy.bonewitz@stantec.com', 'Bonewitz, Jeremy', 1782236062, 'active', '', 'Stantec All cities NO PULL!', 'Infrastructure Recruiting Manager', 'Bonewitz,', 'Jeremy', '', 'New York', '(301) 982-2800', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (744, 'kimberly.bow@stantec.com', 'Bow, Kimberly', 1782236063, 'active', '', 'Stantec All cities NO PULL!', 'Houston Office Leader', 'Bow,', 'Kimberly', '', 'New York', '(219) 688-7543', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (745, 'ken.brown@stantec.com', 'Brown, Ken', 1782236063, 'active', '', 'Stantec All cities NO PULL!', 'Hr Manager', 'Brown,', 'Ken', '', 'New York', '(602) 245-2894', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (746, 'edward.christian@stantec.com', 'Christian, Ed', 1782236064, 'active', '', 'Stantec All cities NO PULL!', 'Sr. Project Director Owner''s Rep NJ', 'Christian,', 'Ed', '', 'New York', '(347) 556-7829', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (747, 'pat.faulkner@stantec.com', 'Faulkner, Pat', 1782236064, 'active', '', 'Stantec All cities NO PULL!', 'Principal Owner''s Rep NC', 'Faulkner,', 'Pat', '', 'New York', '(704) 609-0220', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (748, 'marcus.griffin@stantec.com', 'Griffin, Marcus', 1782236065, 'active', '', 'Stantec All cities NO PULL!', 'Global Talent Acquisition', 'Griffin,', 'Marcus', '', 'New York', '(720) 422-8082', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (749, 'chinojosa@shwgroup.com', 'Hinojosa, Ceci', 1782236066, 'active', '', 'Stantec All cities NO PULL!', 'Dir. Hr & Assoc Principal', 'Hinojosa,', 'Ceci', '', 'Houston', '(817) 300-8543', '', '20 E. Greenway Plz  #825', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (750, 'amy.holzle@stantec.com', 'Holzle, Amy', 1782236066, 'active', '', 'Stantec All cities NO PULL!', 'Principal, AIA, LEED BD+C Dallas', 'Holzle,', 'Amy', '', 'New York', '(214) 708-0891', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (751, 'adriana.jaegerman@stantec.com', 'Jaegerman, Adriana', 1782236067, 'active', '', 'Stantec All cities NO PULL!', 'Managing Principal Structural', 'Jaegerman,', 'Adriana', '', '', '(305) 213-2947', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (752, 'michael.kempin@stantec.com', 'Kempin, Michael', 1782236068, 'active', '', 'Stantec All cities NO PULL!', 'Owners Rep Principal  NYC', 'Kempin,', 'Michael', '', 'New York', '(914) 844-9279', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (753, 'meg.kundert@stantec.com', 'Kundert, Meg', 1782236068, 'active', '', 'Stantec All cities NO PULL!', 'AIA  Business Center Managing Leader', 'Kundert,', 'Meg', '', 'Boston', '(508) 904-5407', '', '311 Summer Street', 'MA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (754, 'dave.lamontagne@stantec.com', 'Lamontagne, David', 1782236069, 'active', '', 'Stantec All cities NO PULL!', 'Vice President', 'Lamontagne,', 'David', '', 'New York', '(212) 768-8886', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (755, 'jim.mcphilemy@stantec.com', 'McPhilemy, Jim', 1782236069, 'active', '', 'Stantec All cities NO PULL!', 'Sr. Principal Owner''s Rep Philadelphia', 'McPhilemy,', 'Jim', '', 'New York', '(215) 313-0966', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (756, 'charlie.patti@stantec.com', 'Patti, Charlie', 1782236070, 'active', '', 'Stantec All cities NO PULL!', 'Principal Electrical', 'Patti,', 'Charlie', '', 'New York', '(917) 923-9331', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (757, 'wendy.rabel@stantec.com', 'Rabel, Wendy', 1782236071, 'active', '', 'Stantec All cities NO PULL!', 'National HR Manager Buildings Group', 'Rabel,', 'Wendy', '', 'New York', '(780) 938-2749', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (758, 'brayes@shwgroup.com', 'Rayes, Bob', 1782236071, 'active', '', 'Stantec All cities NO PULL!', 'Dir. Of Operations AIA NCARB', 'Rayes,', 'Bob', '', 'Houston', '(214) 473-2442', '', '20 E. Greenway Plz  #825', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (759, 'lydia.simmons@stantec.com', 'Simmons, Lydia', 1782236072, 'active', '', 'Stantec All cities NO PULL!', 'Talent Acquisition', 'Simmons,', 'Lydia', '', 'New York', '(404) 668-0177', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (760, 'daniel.six@stantec.com', 'Six, Dan', 1782236073, 'active', '', 'Stantec All cities NO PULL!', 'Talent Acquisition', 'Six,', 'Dan', '', 'New York', '(917) 536-6882', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (761, 'kayla.stevens@stantec.com', 'Stevens, Kayla', 1782236073, 'active', '', 'Stantec All cities NO PULL!', 'Talent Acquisition', 'Stevens,', 'Kayla', '', 'New York', '(403) 629-4863', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (762, 'josh.storey@stantec.com', 'Storey, Josh', 1782236074, 'active', '', 'Stantec All cities NO PULL!', 'Owner''s Rep Principal Charlotte', 'Storey,', 'Josh', '', 'New York', '(704) 390-9982', '', '261 Fifth Avenue 23rd Floor', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (763, 'ftooley@shwgroup.com', 'Tooley, Fred', 1782236075, 'active', '', 'Stantec All cities NO PULL!', 'Principal', 'Tooley,', 'Fred', '', 'Houston', '(713) 877-0900', '', '20 E. Greenway Plz', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (764, 'rcooper@swinter.com', 'Cooper, Roisin', 1782236075, 'active', '', 'Steven Winter Associates', 'HR Director', 'Cooper,', 'Roisin', '', 'New York', '(212) 564-5800 Ext. 140', '', '307 Seventh Avenue, Suite 1701', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (765, 'rmerkin@gmail.com', 'Merkin, Ryan', 1782236076, 'active', '', 'Steven Winter Associates', 'VP, Director Multifamily Energy Services', 'Merkin,', 'Ryan', '', '', '(212) 564-5800', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (766, 'sw@swinter.com', 'Winter, Steven', 1782236076, 'active', '', 'Steven Winter Associates', 'President', 'Winter,', 'Steven', '', 'New York', '(917) 716-5704', '', '307 Seventh Avenue, Suite 1701', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (767, 'nick.benedico@tetratech.com', 'Benedico, Nick', 1782236077, 'active', '', 'Tetra Tech, Inc. (owns Cosentini)', 'Vice President', 'Benedico,', 'Nick', '', '', '(212) 615-3600', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (768, 'janet.dunlop@tetratech.com', 'Dunlop, Janet L.', 1782236078, 'active', '', 'Tetra Tech, Inc. (owns Cosentini)', 'Recruiting Manager', 'Dunlop,', 'Janet L.', '', '', '(626) 470-2355', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (769, 'tonya.goring@tetratech.com', 'Goring, Tonya', 1782236078, 'active', '', 'Tetra Tech, Inc. (owns Cosentini)', 'Director Of HR', 'Goring,', 'Tonya', '', 'Tampa', '(813) 806-0202', '', '5421 Beaumont Center Blvd', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (770, 'john.neff@tetratech.com', 'Neff, John', 1782236079, 'active', '', 'Tetra Tech, Inc. (owns Cosentini)', 'South Florida Director', 'Neff,', 'John', '', 'Tampa', '(954) 295-8031', '', '5421 Beaumont Center Blvd', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (771, 'laura.polkowski@tetratech.com', 'Polkowski, Laura', 1782236080, 'active', '', 'Tetra Tech, Inc. (owns Cosentini)', 'Hr Dir', 'Polkowski,', 'Laura', '', 'Ann Arbor', '(813) 806-0202', '', '710 Avis Drive', 'MI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (772, 'samellison@beckgroup.com', 'Ellison, Sam', 1782236080, 'active', '', 'The Beck Group', 'FL Managing Director', 'Ellison,', 'Sam', '', 'Tampa', '(813) 282-3900', '', '5100 W. Kennedy Blvd # 250', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (773, 'randywinger@beckgroup.com', 'Winger, Randy', 1782236081, 'active', '', 'The Beck Group', 'Dir. Of Ctrl Fl. Dev', 'Winger,', 'Randy', '', 'Lake Mary', '(407) 649-0021', '', '615 Crescent Executive Court', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (774, 'rdemonte@tcco.com', 'Demonte, Rosemarie', 1782236082, 'active', '', 'Turner Construction', 'Vice President, Talent Management', 'Demonte,', 'Rosemarie', '', 'New York', '', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (775, 'emcneill@tcco.com', 'McNeal, Ed', 1782236082, 'active', '', 'Turner Construction', 'Vp.', 'McNeal,', 'Ed', '', 'Maitland', '(407) 210-2500', '', '2201 Lucien Way, # 201', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (776, 'kwsmith@tcco.com', 'Smith, Kurt', 1782236083, 'active', '', 'Turner Construction', 'VP Preconstruction FL', 'Smith,', 'Kurt', '', 'Maitland', '(407) 223-9202', '', '2201 Lucien Way, # 201', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (777, 'tgerlach@tcco.com', 'Tom Gerlach', 1782236083, 'active', '', 'Turner Construction', 'Senior Vice President', 'Tom', 'Gerlach', '', 'Seattle', '', '', '', 'WA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (778, 'bgay@tcco.com', 'Brenda Gay', 1782236084, 'active', '', 'Turner Construction', 'Vice President & Controller', 'Brenda', 'Gay', '', 'New York', '', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (779, 'dwood@tcco.com', 'dan wood', 1782236085, 'active', '', 'Turner Construction', 'Owner', 'dan', 'wood', '', 'Santa Clara', '', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (780, 'bturner@tcco.com', 'Bill Turner', 1782236085, 'active', '', 'Turner Construction', 'Owner', 'Bill', 'Turner', '', 'Delphos', '', '', '', 'OH', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (781, 'dspaulding@tcco.com', 'David M. Spaulding', 1782236086, 'active', '', 'Turner Construction', 'Vice President & General Manager', 'David', 'M. Spaulding', '', 'Cincinnati', '', '', '', 'OH', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (782, 'wmautner@tcco.com', 'Willy Mautner', 1782236087, 'active', '', 'Turner Construction', 'Planning Commissioner', 'Willy', 'Mautner', '', 'San Francisco', '', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (783, 'channing.mcleod@hotmail.com', 'AP, Channing_McLeod_AIA LEED', 1782236087, 'active', '', 'TVS Design', 'Principal', 'AP,', 'Channing_McLeod_AIA LEED', '', 'Atlanta', '(404) 442-7878', '', '', 'GA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (785, 'jhiles@vlkarchitects.com', 'Hiles, Justin S.', 1782236088, 'active', '', 'VLK Architechts', 'Director', 'Hiles,', 'Justin S.', '', '', '(817) 633-1600', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (786, 'mlopez@walterpmoore.com', 'Mauricio Lopez', 1782236089, 'active', '', 'Walter P Moore', 'Principal', 'Mauricio', 'Lopez', '', 'Orlando', '', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (787, 'jales@walterpmoore.com', 'Joe Ales', 1782236090, 'active', '', 'Walter P Moore', 'Managing Director', 'Joe', 'Ales', '', 'Orlando', '', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (788, 'gjimenez@steel.cl', 'Gabriel Jimenez', 1782236090, 'active', '', 'Walter P Moore', 'President', 'Gabriel', 'Jimenez', '', 'Houston', '', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (789, 'dilipc@hotmail.com', 'Dilip Choudhuri', 1782236091, 'active', '', 'Walter P Moore', 'President & CEO', 'Dilip', 'Choudhuri', '', 'Houston', '', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (790, 'nac@wginc.com', 'Clements, Nancy', 1782236092, 'active', '', 'Wantman Group', 'Vice President', 'Clements,', 'Nancy', '', 'Orlando', '(407) 574-8025', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (791, 'lori.fraker@wginc.com', 'Fraker, Lori', 1782236092, 'active', '', 'Wantman Group', 'Corporate Recruiter', 'Fraker,', 'Lori', '', '', '(561) 687-2220', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (792, 'cindy.sachnoff@wginc.com', 'Sachnoff, Cindy', 1782236093, 'active', '', 'Wantman Group', 'Human Resources Director', 'Sachnoff,', 'Cindy', '', 'Orlando', '(561) 472-8158', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (793, 'gary.williams@wantmangroup.com', 'Williams, Gary', 1782236093, 'active', '', 'Wantman Group', 'Sr VP', 'Williams,', 'Gary', '', 'West Palm Beach', '(561) 687-2220', '', '2035 Vista Parkway', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (794, 'wduncan@wdgarch.com', 'Duncan, Will', 1782236094, 'active', '', 'WDG Architecture', 'Principal', 'Duncan,', 'Will', '', 'Dallas', '(214) 939-7925', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (795, 'rhammann@wdgarch.com', 'Frederick Hammann', 1782236095, 'active', '', 'WDG Architecture', 'Managing Principal', 'Frederick', 'Hammann', '', 'Washington', '', '', '', 'DC', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (796, 'mhenry@wdgarch.com', 'Mari Henry', 1782236095, 'active', '', 'WDG Architecture', 'Vice President, Director Business Development', 'Mari', 'Henry', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (797, 'jharvey@wdgarch.com', 'Jason (J. Harv) Harvey', 1782236096, 'active', '', 'WDG Architecture', 'CEO of VIP Studios', 'Jason', '(J. Harv) Harvey', '', 'Upper Marlboro', '', '', '', 'MD', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (798, 'jodi.serfling@wdpartners.com', 'Jodi Serfling', 1782236097, 'active', '', 'WDPartners', 'Recruiter', 'Jodi', 'Serfling', '', 'Columbus', '(949) 753-7676', '', '', 'OH', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (799, 'joanne.heyob@wdpartners.com', 'Joanne Heyob', 1782236097, 'active', '', 'WDPartners', 'Senior Vice President, Operations Strategy & Design', 'Joanne', 'Heyob', '', 'Columbus', '', '', '', 'OH', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (800, 'craig.hodgson@wdpartners.com', 'Craig Hodgson', 1782236098, 'active', '', 'WDPartners', 'Vice President', 'Craig', 'Hodgson', '', 'Philadelphia', '', '', '', 'PA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (801, 'sunilpunjani@hotmail.com', 'Sunil Punjani', 1782236098, 'active', '', 'WDPartners', 'Vice President', 'Sunil', 'Punjani', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (802, 'mark.bateman@wdpartners.com', 'Mark Bateman', 1782236099, 'active', '', 'WDPartners', 'Vice President', 'Mark', 'Bateman', '', 'Dublin', '', '', '', 'OH', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (803, 'chris.doerschlag@wdpartners.com', 'Chris Doerschlag', 1782236100, 'active', '', 'WDPartners', 'Owner', 'Chris', 'Doerschlag', '', 'Columbus', '', '', '', 'OH', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (804, 'martin.doerschlag@wdpartners.com', 'Martin Doerschlag', 1782236100, 'active', '', 'WDPartners', 'Owner', 'Martin', 'Doerschlag', '', 'Columbus', '', '', '', 'OH', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (805, 'shaney@wendelcompanies.com', 'Stewart Haney', 1782236101, 'active', '', 'Wendel', 'President / CEO', 'Stewart', 'Haney', '', 'Buffalo/Niagara', '', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (806, 'geraldsumme@wendelcompanies.com', 'Gerald Summe', 1782236102, 'active', '', 'Wendel', 'Executive Vice President', 'Gerald', 'Summe', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (807, 'agiantomaso@wendelcompanies.com', 'Alan J. Giantomaso', 1782236102, 'active', '', 'Wendel', 'Sr. Vice President', 'Alan', 'J. Giantomaso', '', '', '', '', '', '', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (808, 'mhickey@bechtel.com', 'Michael Hickey', 1782236103, 'active', '', 'Bechtel Corporation', 'President', 'Michael', 'Hickey', '', 'Washington', '', '', '', 'DC', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (809, 'mgmccull@bechtel.com', 'Margaret (Peggy) McCullough', 1782236103, 'active', '', 'Bechtel Corporation', 'Principal Vice President and Manager of Strategy and Business Development', 'Margaret', '(Peggy) McCullough', '', 'Washington', '', '', '', 'DC', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (810, 'tamills@ben.bechtel.com', 'Trevor Mills', 1782236104, 'active', '', 'Bechtel Corporation', 'Vice President', 'Trevor', 'Mills', '', 'Washington', '', '', '', 'DC', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (811, 'james.hicks@bbehc.com', 'James Hicks', 1782236105, 'active', '', 'Bechtel Corporation', 'Principal Vice President', 'James', 'Hicks', '', 'Atoka', '', '', '', 'TN', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (812, 'rmoore@cecelectricalinc.com', 'Russ Moore', 1782236105, 'active', '', 'CEC Companies', 'Vice President', 'Russ', 'Moore', '', 'Fort Worth', '(817) 734-0040', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (813, 'esandri@cecelectricalinc.com', 'Emily Sandri', 1782236106, 'active', '', 'CEC Companies', 'Vice President, Human Resources', 'Emily', 'Sandri', '', 'Irving', '(817) 734-0040', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (814, 'rwaddell@cec-companies.com', 'Ray Waddell', 1782236107, 'active', '', 'CEC Companies', 'CEO', 'Ray', 'Waddell', '', 'Dallas', '(817) 734-0040', '', '', 'TX', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (815, 'tmahabir@gea-pllc.com', 'Trevor Mahabir', 1782236107, 'active', '', 'GEA Consulting Engineers', 'Associate Principal', 'Trevor', 'Mahabir', '', 'New York', '', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (816, 'mhroshko@gea-pllc.com', 'Mykhaylo Hroshko', 1782236108, 'active', '', 'GEA Consulting Engineers', 'Director of Commissioning', 'Mykhaylo', 'Hroshko', '', 'Brooklyn', '', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (817, 'jcarlos@gea-pllc.com', 'Juan Carlos Toro', 1782236108, 'active', '', 'GEA Consulting Engineers', 'Partner', 'Juan', 'Carlos Toro', '', 'New York', '', '', '', 'NY', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (818, 'jwhite@lliengineering.com', 'Jamie White', 1782236109, 'active', '', 'LLI Engineering', 'President', 'Jamie', 'White', '', 'Hickory', '', '', '', 'PA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (819, 'rlinkenmeyer@lliengineering.com', 'Rich Linkenmeyer', 1782236110, 'active', '', 'LLI Engineering', 'Owner', 'Rich', 'Linkenmeyer', '', 'Nora Springs', '', '', '', 'IW', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (821, 'scottm@mbiarch.com', 'Scott Malenock', 1782236111, 'active', '', 'MBI', 'Principal', 'Scott', 'Malenock', '', 'Lake Mary', '', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (822, 'bills@mbiarch.com', 'William (Bill) Steverson', 1782236112, 'active', '', 'MBI', 'President', 'William', '(Bill) Steverson', '', 'Knoxville', '', '', '', 'TN', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (823, 'eddiej@mbiarch.com', 'M. Edward Jett', 1782236112, 'active', '', 'MBI', 'CEO', 'M.', 'Edward Jett', '', 'Knoxville', '', '', '', 'TN', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (824, 'mikeb@mbiarch.com', 'Mike Bujarski', 1782236113, 'active', '', 'MBI', 'Owner', 'Mike', 'Bujarski', '', 'Clear Lake,', '', '', '', 'MN', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (825, 'jayh@mbiarch.com', 'Jay Henderlight', 1782236113, 'active', '', 'MBI', 'Principal, Architect', 'Jay', 'Henderlight', '', 'Knoxville', '', '', '', 'TN', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (826, 'johnb@mbiarch.com', 'John Buchanan', 1782236114, 'active', '', 'MBI', 'Principal, Board of Directors, Mechanical Engineer', 'John', 'Buchanan', '', 'Knoxville', '', '', '', 'TN', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (827, 'jaisaksen@msn.com', 'Jerry A. Isaksen', 1782236115, 'active', '', 'MBI', 'Principal', 'Jerry', 'A. Isaksen', '', 'Chattanooga', '', '', '', 'TN', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (828, 'lfugleberg@fuglebergkoch.com', 'Fugleberg, Lyle', 1782236115, 'active', '', 'Fugleberg Koch', 'Chairman / CEO', 'Fugleberg,', 'Lyle', '', 'Winter Park', '(407) 629-0595', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (829, 'tedh@fuglebergkoch.com', 'Ted Hunton', 1782236116, 'active', '', 'Fugleberg Koch', 'Principal', 'Ted', 'Hunton', '', 'Orlando', '', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (830, 'luisr@fuglebergkoch.com', 'Luis Rosado', 1782236117, 'active', '', 'Fugleberg Koch', 'Principal', 'Luis', 'Rosado', '', 'Orlando', '', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (831, 'ghemann@fuglebergkoch.com', 'Gregg Hemann', 1782236117, 'active', '', 'Fugleberg Koch', 'Principal', 'Gregg', 'Hemann', '', 'Orlando', '', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (832, 'klinhan@fuglebergkoch.com', 'Ken Linehan', 1782236118, 'active', '', 'Fugleberg Koch', 'Principal', 'Ken', 'Linehan', '', 'Winter Park', '', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (833, 'chad@oppenoffice.com', 'Chad Oppenheim', 1782236118, 'active', '', 'Oppenheim Architects', 'Principal', 'Chad', 'Oppenheim', '', 'Miami', '', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (834, 'juan@oppenoffice.com', 'Juan A. Calvo', 1782236119, 'active', '', 'Oppenheim Architects', 'Vice President Design', 'Juan', 'A. Calvo', '', 'Miami', '', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (835, 'robert@oppenoffice.com', 'Robert Gallagher', 1782236120, 'active', '', 'Oppenheim Architects', 'Director of Interiors', 'Robert', 'Gallagher', '', 'Miami', '', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (836, 'gordon@shulmanassoc.com', 'Gordon Chiang', 1782236120, 'active', '', 'Shulman + Associates', 'Printipal Recruiter and Partner', 'Gordon', 'Chiang', '', 'San Francisco', '', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (837, 'allan@shulman-design.com', 'Allan Shulman', 1782236121, 'active', '', 'Shulman + Associates', 'Principal', 'Allan', 'Shulman', '', 'Miami', '', '', '', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (838, 'mark.shulman@g-sa.com', 'Mark Shulman', 1782236122, 'active', '', 'Shulman + Associates', 'Owner', 'Mark', 'Shulman', '', 'Philadelphia', '', '', '', 'PA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (839, 'wls@sscengineering.com', 'Bill Schuchat', 1782236122, 'active', '', 'SSC Engineering', 'Owner', 'Bill', 'Schuchat', '', 'St. Louis', '(636) 530-7770', '', '', 'MO', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (840, 'sszymborski@sscengineering.com', 'Scott Szymborski', 1782236123, 'active', '', 'SSC Engineering', 'Owner', 'Scott', 'Szymborski', '', 'Rancho Santa Margarita', '', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (841, 'bscott@sscengineering.com', 'Brian Scott', 1782236124, 'active', '', 'SSC Engineering', 'Principal & Project Manager', 'Brian', 'Scott', '', 'St. Louis', '', '', '', 'MO', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (842, 'rkwiatkowski@sscengineering.com', 'Richard Kwiatkowski', 1782236124, 'active', '', 'SSC Engineering', 'Principal - Manager', 'Richard', 'Kwiatkowski', '', 'St. Louis', '', '', '', 'MO', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (843, 'ccornett@sscengineering.com', 'J. Chris Cornett', 1782236125, 'active', '', 'SSC Engineering', 'Principal', 'J.', 'Chris Cornett', '', 'St. Louis', '', '', '', 'MO', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (844, 'marcos.stanton@tca-arch.com', 'Marcos Stanton', 1782236125, 'active', '', 'TCA Architects', 'Recruiter', 'Marcos', 'Stanton', '', 'Los Angeles', '', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (845, 'beverly.christiansen@tca-arch.com', 'Beverly Christiansen', 1782236126, 'active', '', 'TCA Architects', 'Associate Principal', 'Beverly', 'Christiansen', '', 'Los Angeles', '', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (846, 'aramc@tca-arch.com', 'Aram Chahbazian', 1782236127, 'active', '', 'TCA Architects', 'Principal', 'Aram', 'Chahbazian', '', 'Orange County', '', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (847, 'eolsen@tca-arch.com', 'Eric Olsen', 1782236127, 'active', '', 'TCA Architects', 'Partner and PIC of Los Angeles Office', 'Eric', 'Olsen', '', 'Los Angeles', '', '', '', 'CA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (848, 'cstranahan@c4architecture.com', 'Stranahan, Clark', 1782236128, 'active', '', 'C4 Architecture', 'Principal', 'Stranahan,', 'Clark', '', 'Orlando', '(407) 221-7864', '', '135 W Central Blvd', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (935, 'jeffrey.sam@aecom.com', 'Jeffrey Sam, P.E.', 1782325965, 'active', '', 'AECOM', 'Structural Engineer', 'Jeffrey', 'Sam, P.E.', '+14019528296', 'Providence', '', '02904', '10 Orms Street, Suite 405', 'RI', 'US', '', '', '{}', '', 'allison.sam@hotmail.com', '', 'https://www.linkedin.com/in/jeffrey-sam-p-e-83143a8', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (938, 'amahajan@aiengineers.com', 'Abhishek Mahajan', 1782325965, 'active', '', 'AI Engineers', 'Infrastructure Engineer', 'Abhishek', 'Mahajan', '', 'Providence', '', '02904', '10 Orms Street, Suite 320', 'RI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (939, 'apatel@aiengineers.com', 'Amit Patel', 1782325966, 'active', '', 'AI Engineers', 'Assistant Resident Engineer', 'Amit', 'Patel', '', 'Providence', '', '02904', '10 Orms Street, Suite 320', 'RI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (940, 'aambrosio@aiengineers.com', 'Antonio Ambrosio', 1782325967, 'active', '', 'AI Engineers', 'EIT Structural Engineer', 'Antonio', 'Ambrosio', '', 'Providence', '', '02904', '10 Orms Street, Suite 320', 'RI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (941, 'mabayadullah@aiengineers.com', 'Md Abayadullah', 1782325967, 'active', '', 'AI Engineers', 'Construction Inspector', 'Md', 'Abayadullah', '', 'Providence', '', '02904', '10 Orms Street, Suite 320', 'RI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (942, 'olivia@aiengineers.com', 'Olivia', 1782325968, 'active', '', 'AI Engineers', '??', 'Olivia', '', '', 'Providence', '', '02904', '10 Orms Street, Suite 320', 'RI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (943, 'vkonda@aiengineers.com', 'Venkata Sai Krishna Konda', 1782325968, 'active', '', 'AI Engineers', 'Construction Engineering Inspector', 'Venkata', 'Sai Krishna Konda', '', 'Providence', '', '02904', '10 Orms Street, Suite 320', 'RI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (944, 'zkhan@aiengineers.com', 'Zaruchit Khan', 1782325969, 'active', '', 'AI Engineers', 'Resident Engineer', 'Zaruchit', 'Khan', '', 'Providence', '', '02904', '10 Orms Street, Suite 320', 'RI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (945, 'kfarhoumand@aiengineers.com', 'Kazem Farhoumand, PE', 1782325970, 'active', '', 'AI Engineers', 'Vice President at AI Engineers', 'Kazem', 'Farhoumand, PE', '+14014511289', 'Providence', '', '02904', '10 Orms Street, Suite 320', 'RI', 'US', '', '', '{}', '', 'coacha38@hotmail.com', '', 'https://www.linkedin.com/in/kazem-farhoumand-pe-778982139', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (946, 'mharrison@aiengineers.com', 'Michael Harrison', 1782325970, 'active', '', 'AI Engineers', 'Construction Inspector', 'Michael', 'Harrison', '+19092071912', 'Providence', '', '02904', '10 Orms Street, Suite 320', 'RI', 'US', '', '', '{}', '', 'mikeisrotten@gmail.com', '', 'https://www.linkedin.com/in/michael-harrison-2ab515131/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (947, 'dshowry@ataneconsulting.com', 'David Stephen Rayappa Shoby', 1782325971, 'active', '', 'ATANE', 'Construction Inspector', 'David', 'Stephen Rayappa Shoby', '', 'Providence', '', '02908', '275 Promenade Street, Providence, RI 02908, United States', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/rsdstephen/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (948, 'jmarini@ataneconsulting.com', 'Jonathan Marini', 1782325971, 'active', '', 'ATANE', 'Assistant Project Manager', 'Jonathan', 'Marini', '', 'Providence', '', '02908', '275 Promenade Street, Providence, RI 02908, United States', 'RI', 'US', '', '', '{}', '', '', '', 'http://www.linkedin.com/in/jonathan-marini-1b035899', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (949, 'khenry@ataneconsulting.com', 'Katie Henry', 1782325972, 'active', '', 'ATANE', 'Bridge Inspector', 'Katie', 'Henry', '', 'Providence', '', '02908', '275 Promenade Street, Suite 150, Providence, RI 02908', 'RI', 'US', '', '', '{}', '', 'katiehenry825@gmail.com', '', 'https://www.linkedin.com/in/katiehenry25/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (950, 'christopher@beta-inc.com', 'Christopher Vela', 1782325973, 'active', '', 'Beta Group', 'Bridge/Transportation Engineer', 'Christopher', 'Vela', '', 'Lincoln', '', '02865', '701 George Washington Highway, Lincoln, RI, United States, 02865', 'RI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (951, 'aglines@fando.com', 'Andy Gline', 1782325973, 'active', '', 'Fuss & O''Neill', 'PE', 'Andy', 'Gline', '', 'Providence', '', '02903', '3 Davol Square, Suite C200', 'RI', 'US', '', '', '{}', '', 'glines.andy@gmail.com', '', 'https://www.linkedin.com/in/andy-glines-pe-1b737a82/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (952, 'arthur.zeman@fando.com', 'Art Zeman', 1782325974, 'active', '', 'Fuss & O''Neill', 'Construction Inspector', 'Art', 'Zeman', '', 'Providence', '', '02903', '3 Davol Square, Suite C200', 'RI', 'US', '', '', '{}', '', 'agz428@hotmail.com', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (953, 'jeffrey.bruso@gza.com', 'Jeffrey Bruso', 1782325974, 'active', '', 'GZA GeoEnvironmental', 'PE, Project Manager', 'Jeffrey', 'Bruso', '', 'Providence', '', '02909', '188 Valley St #300, Providence, RI 02909, United States', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/jeffrey-bruso-p-e-0a5a89197/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (954, 'todd.greene@gza.com', 'Todd Greene', 1782325975, 'active', '', 'GZA GeoEnvironmental', 'Civil Engineering & Design', 'Todd', 'Greene', '', 'Providence', '', '02909', '188 Valley Street Suite 300', 'RI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (955, 'steven@hartengr.com', 'G. Steven Schaeffer', 1782325976, 'active', '', 'Hart Engineering LLC', 'Construction Inspector Manager', 'G.', 'Steven Schaeffer', '', 'Cumberland', '', '02864', '800 Scenic View Drive Cumberland, RI', 'RI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (956, 'jmount@hntb.com', 'Joshua Mount', 1782325976, 'active', '', 'HNTB', 'Project Manager', 'Joshua', 'Mount', '', 'Providence', '', '02908', '275 Promenade Street, Suite 150, Providence, RI 02908, United States', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/joshua-mount-5160358a/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (957, 'gpalumbojr@jhlynch.com', 'Gregory Palumbo', 1782325977, 'active', '', 'J.H. Lynch & Sons', 'Project Engineer', 'Gregory', 'Palumbo', '', 'Cumberland', '', '02864', '50 Lynch Place, Cumberland, RI 02864', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/gregory-palumbo-jr-8404941b7', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (958, 'ateliska@jensenhughes.com', 'Abbey Teliska, PE', 1782325978, 'active', '', 'Jensen Hughes', 'Manager', 'Abbey', 'Teliska, PE', '+18453372703', 'Warwick', '', '02886', '117 Metro Center Blvd, Suite 1002', 'RI', 'US', '', '', '{}', '', 'pteliska@gmail.com', '', 'https://www.linkedin.com/in/abbey-teliska-pe-b7450b6b/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (959, 'cborland@hwlochner.com', 'Christopher Borland', 1782325978, 'active', '', 'Lochner', 'PE, Construction Engineering Inspector', 'Christopher', 'Borland', '', 'Providence', '', '02903', '33 Acorn Street', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/christopher-borland-pe-77b40799?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAABTiM48BjaeG40jaaKtE4BqsY4BxHV3fNM8&lipi=urn%3Ali%3Apage%3Acompanies_company_people_index%3B3dda487d-64f4-4d09-a9b9-bc1c72aa86ba', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (960, 'dan.fitzgerald@hwlochner.com', 'Dan Fitzgerald', 1782325979, 'active', '', 'Lochner', 'Construction Inspector', 'Dan', 'Fitzgerald', '', 'Cranston', '', '02920', '1145 Reservoir Avenue, Suite 302. Cranston, RI 02920', 'RI', 'US', '', '', '{}', '', 'fitzys@hotmail.com', '', 'https://www.linkedin.com/in/dan-fitzgerald-b4354b20b/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (961, 'jcaponi@hwlochner.com', 'John Caponi', 1782325979, 'active', '', 'Lochner', 'Construction Inspector', 'John', 'Caponi', '', 'Providence', '', '02903', '33 Acorn Street Providence, RI 02903, United States', 'RI', 'US', '', '', '{}', '', '', '', 'http://www.linkedin.com/in/john-caponi-7b203023a', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (962, 'sqabbal@hwlochner.com', 'Soufiane Qabbal', 1782325980, 'active', '', 'Lochner', 'Construction Inspector', 'Soufiane', 'Qabbal', '', 'Providence', '', '02903', '33 Acorn Street Providence, RI 02903, United States', 'RI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (963, 'joshua.roseberg@mbakerintl.com', 'Joshua Roseberg', 1782325981, 'active', '', 'Michael Baker International', 'Project Engineer', 'Joshua', 'Roseberg', '', 'Providence', '', '02903', '56 Exchange Ter Suite 400, Providence, RI 02903, United States', 'RI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (964, 'slafleur@ataneconsulting.com', 'Sadie LaFleur', 1782325981, 'active', '', 'Michael Baker International', 'Bridge Inspector', 'Sadie', 'LaFleur', '401-365-9683', 'Providence', '', '02903', '56 Exchange Ter Suite 400, Providence, RI 02903, United States', 'RI', 'US', '', '', '{}', '', 'sadielafleur@gmail.com', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (965, 'ebuzzi@nei-cds.com', 'Eric Buzzi, P.E', 1782325982, 'active', '', 'Narragansett Engineering Inc', 'Civil Engineer', 'Eric', 'Buzzi, P.E', '14015889289', 'Portsmouth', '', '02871', '3102 East Main Road', 'RI', 'US', '', '', '{}', '', 'EricBuzzi@outlook.com', '', 'https://www.linkedin.com/in/eric-buzzi-p-e-405662b8/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (966, 'ajudd@shawmut.com', 'Alan Judd', 1782325982, 'active', '', 'Shawmut Construction', 'Construction Manager', 'Alan', 'Judd', '', 'Providence', '', '02903', '3 Davol Sq, Providence, RI , United States', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/alan-judd-00507121/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (967, 'cfay@vhb.com', 'Christopher Fay', 1782325983, 'active', '', 'VHB', 'PE, Transportation Systems Manager', 'Christopher', 'Fay', '', 'Providence', '', '02903', '1 Cedar Street Suite 400', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/christopher-fay-pe-imsa-iii-a8b76611/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (968, 'lgalkowski@vhb.com', 'Lawrence Galkowski', 1782325984, 'active', '', 'VHB', 'Senior Construction Engineer', 'Lawrence', 'Galkowski', '', 'Providence', '', '02903', '1 Cedar St Suite 400, Providence, RI 02903, United States', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/lawrence-galkowski-80993210', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (969, 'mbowe@vhb.com', 'Mackenzie Bowe', 1782325984, 'active', '', 'VHB', 'Engineer', 'Mackenzie', 'Bowe', '', 'Providence', '', '02903', '1 Cedar St Suite 400, Providence, RI 02903, United States', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/mackenzie-bowe-pe-b207342b', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (970, 'rrhodes@vhb.com', 'Rick Rhodes, P.E.', 1782325985, 'active', '', 'VHB', 'Director of Highway Engineering', 'Rick', 'Rhodes, P.E.', '4013914600', 'Providence', '', '02903', '1 Cedar St Suite 400, Providence, RI 02903, United States', 'RI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (971, 'sryan@vhb.com', 'Ryan S.', 1782325985, 'active', '', 'VHB', 'Construction Engineer', 'Ryan', 'S.', '', 'Providence', '', '02903', '1 Cedar St Suite 400, Providence, RI 02903, United States', 'RI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (972, 'shobson@vhb.com', 'Scott S. Hobson', 1782325986, 'active', '', 'VHB', 'Senior Ecologist and Environmental Permitting Specialist', 'Scott', 'S. Hobson', '', 'Providence', '', '02903', '1 Cedar St Suite 400, Providence, RI 02903, United States', 'RI', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (973, 'eric.offenberg@wsp.com', 'Eric Offenberg', 1782325987, 'active', '', 'WSP', 'Office Lead', 'Eric', 'Offenberg', '', 'North Providence', '', '02904', '1223 Mineral Spring Avenue', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/mgs1107/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (974, 'matthew.sullivan@wsp.com', 'Matthew Sullivan', 1782325987, 'active', '', 'WSP', 'Associate Bridge Inspector, Structural Engineer', 'Matthew', 'Sullivan', '', 'North Providence', '', '02904', '1223 Mineral Spring Avenue', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/mgs1107/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (975, 'nizzo@geiconsultants.com', 'Nicholas Izzo', 1782325988, 'active', '', 'GEI Consultants, Inc.', 'Geotechnical Project Manager', 'Nicholas', 'Izzo', '732-423-1850', 'Newport', '', '02840', '221 Third Street, Suite 603', 'RI', 'US', '', '', '{}', '', 'nickizzo523@gmail.com', '', 'https://www.linkedin.com/in/nicholas-izzo-p-e-788a6343/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (976, 'pfusco@parecorp.com', 'Philip Fusco', 1782325989, 'active', '', 'Pare Corporation', 'Vice President Transportation', 'Philip', 'Fusco', '401-585-5485', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/philip-fusco-p-e-ptoe-b514a631', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (977, 'bmahoney@collinsengr.com', 'Brian J. Mahoney', 1782325989, 'active', '', 'Collins Engineers', 'Senior Project Manager', 'Brian', 'J. Mahoney', '401-595-9261', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/brian-j-mahoney-p-e-aa654330', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (978, 'bquinn@geiconsultants.com', 'Bevlyn Quinn', 1782325990, 'active', '', 'GEI Consultants', 'Project Manager', 'Bevlyn', 'Quinn', '978-580-8284', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', 'quinn2bmq@yahoo.com', '', 'https://www.linkedin.com/in/bevlyn-quinn-b3599b1a6', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (979, 'dabbott@geiconsultants.com', 'Daniela Abbott', 1782325990, 'active', '', 'GEI Consultants', 'Senior Vice President & East Region Operations Manager', 'Daniela', 'Abbott', '', 'Newport', '', '02840', '', 'RI', 'US', '', '', '{}', '', 'daniela.abbott@gmail.com', '', 'https://www.linkedin.com/in/dthabbott/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (980, 'nmerriman@geiconsultants.com', 'Nathaniel Merriman', 1782325991, 'active', '', 'GEI Consultants', 'Project Manager - Waterfront Structures', 'Nathaniel', 'Merriman', '860-849-3572', 'Newport', '', '02840', '', 'RI', 'US', '', '', '{}', '', 'nathanielmerriman@gmail.com', '', 'https://www.linkedin.com/in/nathanielmerriman/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (982, 'wmcgrath@beta-inc.com', 'William McGrath', 1782325992, 'active', '', 'BETA Group, Inc.', 'Vice President', 'William', 'McGrath', '318 566 6154', 'Worcester', '', '01601', '', 'MA', 'US', '', '', '{}', '', 'mcgrathbill@hotmail.com', '', 'https://www.linkedin.com/in/william-mcgrath-061a1753/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (983, 'srichtarik@beta-inc.com', 'Steve Richtarik', 1782325993, 'active', '', 'BETA Group, Inc.', 'Sr. Project Manager', 'Steve', 'Richtarik', '', 'Lincoln', '', '02802', '', 'RI', 'US', '', '', '{}', '', 'saraben1@cox.net', '', 'https://www.linkedin.com/in/steve-richtarik-a8424211/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (984, 'mshute@beta-inc.com', 'Matt Shute', 1782325993, 'active', '', 'BETA Group, Inc.', 'Vice President', 'Matt', 'Shute', '(401) 230-7992', 'Lincoln', '', '02802', '', 'RI', 'US', '', '', '{}', '', 'mpshute@gmail.com', '', 'https://www.linkedin.com/in/matt-shute-pe-b672183/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (985, 'jlinhares@beta-inc.com', 'Jared Linhares', 1782325994, 'active', '', 'BETA Group, Inc.', 'Senior Project Manager', 'Jared', 'Linhares', '774-254-4159', 'Attleboro', '', '02703', 'Lincoln, Rhode', 'MA', 'US', '', '', '{}', '', 'jlinhares1523@gmail.com', '', 'https://www.linkedin.com/in/jared-linhares-pe-cpswq-1b9b2346/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (986, 'tperez@vhb.com', 'Tomas Perez', 1782325995, 'active', '', 'VHB', 'Project Manager / Structural Engineer', 'Tomas', 'Perez', '(401) 256-9096', 'Boston', '', '02108', 'Providence', 'MA', 'US', '', '', '{}', '', 'tomasenriqueenrique21@hotmail.com', '', 'https://www.linkedin.com/in/tomas-perez-pe-se-85560b52', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (987, 'jrosen@vhb.com', 'Josh Rosen', 1782325995, 'active', '', 'VHB', 'Senior Project Manager', 'Josh', 'Rosen', '', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/josh-rosen-p-e-0432b6413/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (988, 'alevin@vhb.com', 'A Skye Levin', 1782325996, 'active', '', 'VHB', 'Senior Project Manager', 'A', 'Skye Levin', '(602) 821-1256', 'East Greenwich', '', '02818', '', 'RI', 'US', '', '', '{}', '', 'askyee15@yahoo.com', '', 'https://www.linkedin.com/in/a-skye-levin-p-e-6a289274', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (989, 'jstabach@vhb.com', 'Jonathan Stabach', 1782325996, 'active', '', 'VHB', 'Principal', 'Jonathan', 'Stabach', '401 225 2076', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', 'shayshay3050@gmail.com', '', 'https://www.linkedin.com/in/jonathan-stabach-8b01383', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (990, 'jdufresne@vhb.com', 'Justin Dufresne', 1782325997, 'active', '', 'VHB', 'Managing Director, Providence', 'Justin', 'Dufresne', '508 847 8553', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', 'opus365llc@gmail.com', '', 'https://www.linkedin.com/in/justin-dufresne-87412686', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (991, 'slindgren@vhb.com', 'Scott Lindgren', 1782325998, 'active', '', 'VHB', 'Director of Land Development', 'Scott', 'Lindgren', '774-217-0067', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', 'snadams@comcast.net', '', 'https://www.linkedin.com/in/scottlindgren', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (992, 'tlucivero@vhb.com', 'Tom Lucivero', 1782325998, 'active', '', 'VHB', 'Senior Vice President', 'Tom', 'Lucivero', '401-529-5067', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/tom-lucivero-7815b410', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (993, 'jklein@vhb.com', 'Jeffrey Klein', 1782325999, 'active', '', 'VHB', 'Director of Transportation', 'Jeffrey', 'Klein', '603-738-7067', 'Coventry', '', '02816', '', 'RI', 'US', '', '', '{}', '', 'kleinkmary@gmail.com', '', 'https://www.linkedin.com/in/jeffrey-klein-803351b', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (994, 'rcodega@vhb.com', 'Renee Codega', 1782325999, 'active', '', 'VHB', 'Project Manager', 'Renee', 'Codega', '508-414-0599', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', '2637coleman@att.net', '', 'https://www.linkedin.com/in/renee-codega-pe-59a94664', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (995, 'stevenmorin@johnrocchiocorp.com', 'Steven Morin', 1782326000, 'active', '', 'John Rocchio Corporation', 'Vice President Operations', 'Steven', 'Morin', '(401) 641-8876', 'Coventry', '', '02816', '', 'RI', 'US', '', '', '{}', '', 'smorin31@yahoo.com', '', 'https://www.linkedin.com/in/steven-morin-04a32638/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (996, 'josephgodino@johnrocchiocorp.com', 'Joseph Godino', 1782326001, 'active', '', 'John Rocchio Corporation', 'Vice President of Preconstruction Services', 'Joseph', 'Godino', '(401) 935-3337', 'Johnston', '', '02919', '', 'RI', 'US', '', '', '{}', '', 'joseph.godino87@gmail.com', '', 'https://www.linkedin.com/in/joseph-godino-p-e-msce-a0a30a47/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (997, 'kberchielli@parecorp.com', 'Kenneth Berchielli', 1782326001, 'active', '', 'Pare Corporation', 'Geotechnical Engineer', 'Kenneth', 'Berchielli', '', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', 'jenniferberchielli@gmail.com', '', 'https://www.linkedin.com/in/kennethberchielli/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (998, 'caleigh.duffy@aecom.com', 'Caleigh Duffy', 1782326002, 'active', '', 'AECOM', 'Structural Engineering II', 'Caleigh', 'Duffy', '', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/caleigh-duffy/', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (999, 'christi.fragale@wsp.com', 'Christi Fragale', 1782326003, 'active', '', 'WSP USA', 'Lead Engineer / Project Manager', 'Christi', 'Fragale', '', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/christi-fragale-887b02169', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1000, 'tturcotte@parecorp.com', 'Todd Turcotte', 1782326003, 'active', '', 'Pare Corporation', 'Vice President Waterfront/Marine Practice Lead', 'Todd', 'Turcotte', '401 255 5013', 'Lincoln', '', '02802', '', 'RI', 'US', '', '', '{}', '', 'triathlete1872@gmail.com', '', 'https://www.linkedin.com/in/todd-turcotte-pe-wedg-2b31a615', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1001, 'bblanchard@parecorp.com', 'Brandon Blanchard', 1782326004, 'active', '', 'Pare Corporation', 'Vice President', 'Brandon', 'Blanchard', '(860) 319-1419', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', 'brblanch@gmail.com', '', 'https://www.linkedin.com/in/brandon-blanchard-3b42864', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1002, 'bwrigley@parecorp.com', 'Brian Wrigley', 1782326004, 'active', '', 'Pare Corporation', 'Managing Engineer', 'Brian', 'Wrigley', '508 801 9244', 'Lincoln', '', '02802', '', 'RI', 'US', '', '', '{}', '', 'bwrigley11@verizon.net', '', 'https://www.linkedin.com/in/brian-wrigley-p-e-09bb7a1a', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1003, 'cmorrison@parecorp.com', 'Chad Morrison', 1782326005, 'active', '', 'Pare Corporation', 'Managing Engineer - Civil Division', 'Chad', 'Morrison', '401 742 4376', 'Greenville', '', '02828', '', 'RI', 'US', '', '', '{}', '', 'ctmcads@outlook.com', '', 'https://www.linkedin.com/in/morrisonrocks', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1004, 'cadamo@parecorp.com', 'Carl Adamo', 1782326006, 'active', '', 'Pare Corporation', 'Vice President', 'Carl', 'Adamo', '(401) 365-7487', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', 'carladamo@gmail.com', '', 'https://www.linkedin.com/in/carl-adamo-b4978110', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1005, 'bsykes@parecorp.com', 'Robert Sykes', 1782326006, 'active', '', 'Pare Corporation', 'Managing Engineer', 'Robert', 'Sykes', '', 'Lincoln', '', '02802', '', 'RI', 'US', '', '', '{}', '', 'rayjnayjames13@gmail.com', '', 'https://www.linkedin.com/in/robert-sykes-p-e-595981116', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1006, 'delwell@parecorp.com', 'David Elwell', 1782326007, 'active', '', 'Pare Corporation', 'Managing Engineer', 'David', 'Elwell', '203 927 3398', 'Lincoln', '', '02802', '', 'RI', 'US', '', '', '{}', '', 'kittyhursh@gmail.com', '', 'https://www.linkedin.com/in/david-elwell-547b7a16', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1007, 'esilva@parecorp.com', 'Eric Silva', 1782326007, 'active', '', 'Pare Corporation', 'Managing Engineer', 'Eric', 'Silva', '(401) 744-3842', 'Cumberland', '', '02864', '', 'RI', 'US', '', '', '{}', '', 'eric.silva12@gmail.com', '', 'https://www.linkedin.com/in/eric-silva-a83547324', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1008, 'jsimmons@beta-inc.com', 'Joe Simmons', 1782326008, 'active', '', 'BETA Group, Inc.', 'Senior Construction Manager', 'Joe', 'Simmons', '(401) 378-7942', 'Warren', '', '02885', '', 'RI', 'US', '', '', '{}', '', 'jesfultz@icloud.com', '', 'https://www.linkedin.com/in/joe-simmons-472a5a71', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1009, 'jmcloughlin@beta-inc.com', 'Joe McLoughlin', 1782326009, 'active', '', 'BETA Group, Inc.', 'Vice President', 'Joe', 'McLoughlin', '(508) 212-8841', 'Lincoln', '', '02802', '', 'RI', 'US', '', '', '{}', '', 'newenglandbouldering@gmail.com', '', 'https://www.linkedin.com/in/joe-mcloughlin-97866722', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1010, 'kaguiar@beta-inc.com', 'Kevin Aguiar', 1782326009, 'active', '', 'BETA Group, Inc.', 'Vice President', 'Kevin', 'Aguiar', '401 595 2041', 'Lincoln', '', '02802', '', 'RI', 'US', '', '', '{}', '', 'socco21985@yahoo.com', '', 'https://www.linkedin.com/in/kevin-aguiar-a468202a', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1011, 'rgreenway@beta-inc.com', 'Ryan Greenway', 1782326010, 'active', '', 'BETA Group, Inc.', 'Senior Project Manager', 'Ryan', 'Greenway', '508-509-4044', 'Lincoln', '', '02802', '', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/ryan-greenway-pe-276080268', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1012, 'ncorvello@beta-inc.com', 'Nicholas Corvello', 1782326010, 'active', '', 'BETA Group, Inc.', 'Vice President', 'Nicholas', 'Corvello', '', 'Lincoln', '', '02802', '', 'RI', 'US', '', '', '{}', '', 'ncorvello@gmail.com', '', 'https://www.linkedin.com/in/nicholas-corvello-p-e-b3639522', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1013, 'dleighton@beta-inc.com', 'Donald Leighton', 1782326011, 'active', '', 'BETA Group, Inc.', 'Senior Vice President', 'Donald', 'Leighton', '', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', 'frdon4401@gmail.com', '', 'https://www.linkedin.com/in/donald-leighton-7ab17312', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1014, 'rdrake@beta-inc.com', 'Robert Drake', 1782326012, 'active', '', 'BETA Group, Inc.', 'Vice President', 'Robert', 'Drake', '', 'Lincoln', '', '02802', '', 'RI', 'US', '', '', '{}', '', 'atka125@hotmail.com', '', 'https://www.linkedin.com/in/robert-drake-5527a82b', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1015, 'jbambara@chacompanies.com', 'Joseph Bambara', 1782326012, 'active', '', 'CHA Consulting, Inc.', 'Senior Project Manager', 'Joseph', 'Bambara', '(860) 969-6871', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', 'jmbambara@hotmail.com', '', 'https://www.linkedin.com/in/joseph-bambara-pe-pmp-lsit-9b214729', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1016, 'christopher.feeney@stantec.com', 'Christopher Feeney', 1782326013, 'active', '', 'Stantec', 'Senior Principal', 'Christopher', 'Feeney', '401 316 1153', 'Barrington', '', '02806', '', 'RI', 'US', '', '', '{}', '', 'feeney6@cox.net', '', 'https://www.linkedin.com/in/christopher-feeney-a45a6a65', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1017, 'melissa.carter@stantec.com', 'Melissa Carter', 1782326014, 'active', '', 'Stantec', 'Vice President', 'Melissa', 'Carter', '401-523-7679', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', 'catakidmc@gmail.com', '', 'https://www.linkedin.com/in/melissacarterwater', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1018, 'brett.jones@jacobs.com', 'Brett Jones', 1782326014, 'active', '', 'Jacobs', 'Vice President, Director of Major Transportation Projects', 'Brett', 'Jones', '(714) 310-2725', 'North Kingstown', '', '02852', '', 'RI', 'US', '', '', '{}', '', 'thezookeepers@live.com', '', 'https://www.linkedin.com/in/brett-jones-03223ab3', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1019, 'bill.cotter@jacobs.com', 'Bill Cotter', 1782326015, 'active', '', 'Jacobs', 'Senior Project Manager', 'Bill', 'Cotter', '', 'Hope Valley', '', '02832', '', 'RI', 'US', '', '', '{}', '', 'bjcotter@verizon.net', '', 'https://www.linkedin.com/in/bill-cotter-pe-470a31b', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1020, 'anthony.turchetta@jacobs.com', 'Anthony Turchetta', 1782326015, 'active', '', 'Jacobs', 'Project Manager', 'Anthony', 'Turchetta', '', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', 'anthonyturchetta67@gmail.com', '', 'https://www.linkedin.com/in/anthony-turchetta-283a3a153', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1021, 'avaranelli@collinsengr.com', 'Allison Varanelli', 1782326016, 'active', '', 'Collins Engineers, Inc', 'Project Manager', 'Allison', 'Varanelli', '', 'East Greenwich', '', '02893', '', 'RI', 'US', '', '', '{}', '', '', '', 'https://www.linkedin.com/in/allison-varanelli-p-e-765b76164', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1022, 'nbrennan@geiconsultants.com', 'Nicole Brennan', 1782326017, 'active', '', 'GEI Consultants, Inc.', 'Project Manager / Geologist', 'Nicole', 'Brennan', '', 'Newport', '', '02840', '', 'RI', 'US', '', '', '{}', '', 'brennannicole72@gmail.com', '', 'https://www.linkedin.com/in/nicole-brennan-geo', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1023, 'moneil@geiconsultants.com', 'Matt O''Neil', 1782326017, 'active', '', 'GEI Consultants, Inc.', 'Vice President, Senior Project Manager', 'Matt', 'O''Neil', '', 'Providence', '', '02840', '', 'RI', 'US', '', '', '{}', '', 'mjoneil109@aol.com', '', 'https://www.linkedin.com/in/matt-o-neil-p-e-70a5684', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1024, 'mblackburn@jensenhughes.com', 'Mark Blackburn', 1782326018, 'active', '', 'Jensen Hughes', 'Senior Vice President - North America North Region', 'Mark', 'Blackburn', '401-965-3204', 'Warwick', '', '02818', '', 'RI', 'US', '', '', '{}', '', 'meldkelley@gmail.com', '', 'https://www.linkedin.com/in/mark-blackburn-p-e-6190a3109', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1388, 'aislam@aiengineers.com; saslam@aiengineers.com', 'Abul Islam', 1782756289, 'active', '', 'AI Engineers Inc.', 'Bridge & Structure Inspection; Bridge and Structure Design; Construction Eng & Insp (Facilities); Construction Eng & Insp (Rail); Construction Eng & Insp (Road, Bridge); Facilities Design (All Modal Buildings/Vertical Structures); Highway Design; Rail Design; Traffic and Safety Engineering', 'Abul', 'Islam', '', 'Middletown', '(860)635-7740', '6457', '919 Middle Street', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1393, 'nhabesch@beta-inc.com; acouture@beta-inc.com', 'Najib O. Habesch', 1782756292, 'active', '', 'Beta Group Inc.', 'Bridge & Structure Inspection; Bridge and Structure Design; Construction Eng & Insp (Road, Bridge); Facilities Design (All Modal Buildings/Vertical Structures); Highway Design; Traffic and Safety Engineering', 'Najib', 'O. Habesch', '', 'Hartford', '(860)513-1503 x7044', '6114', '1010 Wethersfield Avenue Suite 305', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1400, 'kmcgaw@consoreng.com; jmessier@consoreng.com', 'Kelsey McGaw', 1782756297, 'active', '', 'Consor Engineering and Land Surveying-N.Y. PC', 'Bridge & Structure Inspection; Bridge and Structure Design', 'Kelsey', 'McGaw', '', 'Rocky Hill', '860-840-2505', '6067', '50 Inwood Road Suite 101', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1402, 'figgqual@figgbridge.com; jdoll@figgbridge.com', 'Joseph Doll', 1782756298, 'active', '', 'Figg Bridge Inspection Inc', 'Bridge & Structure Inspection; Bridge and Structure Design', 'Joseph', 'Doll', '', 'Tallahassee', '(850)224-7400', '32301', '424 N. Calhoun Street', 'FL', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1403, 'gdorosh@fando.com; ksolloway@fando.com', 'Gregory Dorosh', 1782756299, 'active', '', 'Fuss & O''Neill Inc.', 'Bridge & Structure Inspection; Bridge and Structure Design; Construction Eng & Insp (Road, Bridge); Facilities Design (All Modal Buildings/Vertical Structures); Highway Design; Traffic and Safety Engineering', 'Gregory', 'Dorosh', '', 'Manchester', '(860)783-4685', '6040', '146 Hartford Road', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1405, 'echuang@garginc.com; garg-ct@garginc.com', 'Eugene Y. Chuang', 1782756300, 'active', '', 'Garg Consulting Services Inc.', 'Bridge & Structure Inspection; Bridge and Structure Design; Construction Eng & Insp (Facilities); Construction Eng & Insp (Rail); Construction Eng & Insp (Road, Bridge); Facilities Design (All Modal Buildings/Vertical Structures); Rail Design', 'Eugene', 'Y. Chuang', '', 'Rocky Hill', '(860)563-0582', '6067', '2096A Silas Deane Hwy', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1408, 'ko@greenintl.com; kfarhoumand@greenintl.com', 'Ko Ishikura', 1782756302, 'active', '', 'Green International Affiliates Inc.', 'Bridge & Structure Inspection; Bridge and Structure Design; Highway Design; Traffic and Safety Engineering', 'Ko', 'Ishikura', '', 'Tewksbury', '(978)923-0400', '1876', '100 Ames Pond Drive Suite 200', 'MA', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1410, 'twilson@hwlochner.com; chylas@hwlochner.com', 'Timothy Wilson', 1782756304, 'active', '', 'H.W. Lochner Inc.', 'Bridge & Structure Inspection; Bridge and Structure Design; Construction Eng & Insp (Rail); Construction Eng & Insp (Road, Bridge); Facilities Design (All Modal Buildings/Vertical Structures); Highway Design; Rail Design; Traffic and Safety Engineering', 'Timothy', 'Wilson', '', 'East Hartford', '(860)760-5840', '6108', '55 Hartland Street Suite 401', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1412, 'sandra.stavola@hdrinc.com; james.jackson@hdrinc.com', 'Sandra Stavola', 1782756305, 'active', '', 'HDR Engineering Inc.', 'Bridge & Structure Inspection; Bridge and Structure Design; Construction Eng & Insp (Facilities); Construction Eng & Insp (Rail); Construction Eng & Insp (Road, Bridge); Facilities Design (All Modal Buildings/Vertical Structures); Highway Design; Rail Design; Traffic and Safety Engineering', 'Sandra', 'Stavola', '', 'Rocky Hill', '860-324-6313', '6067', '55 Capital Blvd Suite 403', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1413, 'jargiro@hntb.com; rifranciamore@hntb.com; ldigovanni@hntb.com', 'Jacob Argiro', 1782756306, 'active', '', 'HNTB Corporation', 'Bridge & Structure Inspection; Bridge and Structure Design; Construction Eng & Insp (Facilities); Construction Eng & Insp (Rail); Construction Eng & Insp (Road, Bridge); Facilities Design (All Modal Buildings/Vertical Structures); Highway Design; Rail Design; Traffic and Safety Engineering', 'Jacob', 'Argiro', '', 'Rocky Hill', '(860)734-6761', '6067', '55 Capital Boulevard 4th Floor', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1418, 'info@kseng.com; achakraborty@kseng.com', 'Andy Chakraborty', 1782756309, 'active', '', 'KS Engineers PC', 'Bridge & Structure Inspection; Bridge and Structure Design; Construction Eng & Insp (Facilities); Construction Eng & Insp (Rail); Construction Eng & Insp (Road, Bridge); Highway Design; Rail Design; Traffic and Safety Engineering', 'Andy', 'Chakraborty', '', 'Newark', '973-623-2999 x.2775', '7102', '2 Riverfront Plaza 3rd Floor', 'NJ', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1421, 'jmiranda@mjengineers.com', 'Jamil Miranda', 1782756311, 'active', '', 'M&J Engineering, P.C.', 'Bridge & Structure Inspection; Construction Eng & Insp (Facilities); Construction Eng & Insp (Rail); Construction Eng & Insp (Road, Bridge); Traffic and Safety Engineering', 'Jamil', 'Miranda', '', 'North Haven', '516-547-2905', '06473', '116 Washingon Ave, 2nd floor', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1425, 'sdelesdernier@mbakerintl.com; cassey.weed@mbakerintl.com', 'Scott Delesdernier', 1782756313, 'active', '', 'Michael Baker International Inc.', 'Bridge & Structure Inspection; Bridge and Structure Design; Construction Eng & Insp (Facilities); Construction Eng & Insp (Rail); Construction Eng & Insp (Road, Bridge); Facilities Design (All Modal Buildings/Vertical Structures); Highway Design; Rail Design; Traffic and Safety Engineering', 'Scott', 'Delesdernier', '', 'Rocky Hill', '(860)257-2435', '6067', '500 Enterprise Drive Suite 2B', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1437, 'jscala@tectonicengineering.com; bmercure@tectonicengineering.com', 'Jeffrey A. Scala', 1782756321, 'active', '', 'Tectonic Engineering Consultants Geologists & Land Surveyors Inc.', 'Bridge & Structure Inspection; Bridge and Structure Design; Construction Eng & Insp (Facilities); Construction Eng & Insp (Rail); Construction Eng & Insp (Road, Bridge); Facilities Design (All Modal Buildings/Vertical Structures); Highway Design; Traffic and Safety Engineering', 'Jeffrey', 'A. Scala', '', 'Rocky Hill', '(860)563-2341 x:12', '6067', '1344 Silas Deane Highway Suite 500', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1441, 'soneill@vhb.com; rbousa@vhb.com', 'Robin Bousa', 1782756324, 'active', '', 'VHB/Vanasse Hangen Brustlin Inc.', 'Bridge & Structure Inspection; Bridge and Structure Design; Construction Eng & Insp (Road, Bridge); Facilities Design (All Modal Buildings/Vertical Structures); Highway Design; Rail Design; Traffic and Safety Engineering', 'Robin', 'Bousa', '', 'Wethersfield', '(860)807-4433', '6109', '100 Great Meadow Road Suite 200', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1443, 'casalep@wseinc.com; slonusl@wseinc.com', 'Pompeo Casale', 1782756325, 'active', '', 'Weston & Sampson Engineers Inc.', 'Bridge & Structure Inspection; Bridge and Structure Design; Construction Eng & Insp (Road, Bridge); Facilities Design (All Modal Buildings/Vertical Structures); Highway Design; Traffic and Safety Engineering', 'Pompeo', 'Casale', '', 'Rocky Hill', '508.202.4211', '6067', '712 Brook Street Suite 103', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1532, 'echuang@garginc.com', 'Eugene Y. Chuang', 1782819613, 'active', '', 'Garg Consulting Services, Inc.', '', 'Eugene', 'Y. Chuang', '', 'Rocky Hill', '(860)563-0582', '06067', '2096A Silas Deane Hwy', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1537, 'twilson@hwlochner.com', 'Timothy Wilson', 1782819616, 'active', '', 'H.W. Lochner, Inc.', '', 'Timothy', 'Wilson', '', 'East Hartford', '(860)760-5840', '06108', '55 Hartland Street, Suite 401', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1539, 'sandra.stavola@hdrinc.com', 'Sandra Stavola', 1782819617, 'active', '', 'HDR Engineering, Inc.', '', 'Sandra', 'Stavola', '', 'Rocky Hill', '860-324-6313', '06067', '55 Capital Blvd, Suite 403', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1540, 'jargiro@hntb.com', 'Jacob Argiro', 1782819617, 'active', '', 'HNTB Corporation', '', 'Jacob', 'Argiro', '', 'Rocky Hill', '(860)734-6761', '06067', '55 Capital Boulevard, 4th Floor', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1552, 'sdelesdernier@mbakerintl.com', 'Scott Delesdernier', 1782819625, 'active', '', 'Michael Baker International., Inc.', '', 'Scott', 'Delesdernier', '', 'Rocky Hill', '(860)257-2435', '06067', '500 Enterprise Drive, Suite 2B', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1564, 'jscala@tectonicengineering.com', 'Jeffrey A. Scala', 1782819632, 'active', '', 'Tectonic Engineering Consultants, Geologists & land Surveyors, Inc.', '', 'Jeffrey', 'A. Scala', '', 'Rocky Hill', '(860)563-2341 x:12', '06067', '1344 Silas Deane Highway, Suite 500', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');
INSERT INTO "contacts" ("id", "email", "name", "created_at", "status", "tags", "company", "title", "first_name", "last_name", "phone_2", "city", "phone", "zip_code", "street_address", "state", "country", "segments", "notes", "custom_fields", "county", "email_2", "business_email", "linkedin", "region", "website", "work_phone_2", "personal_email_2", "mobile_phone_2") VALUES (1568, 'soneill@vhb.com', 'Robin Bousa', 1782819635, 'active', '', 'VHB/Vanasse Hangen Brustlin, Inc.', '', 'Robin', 'Bousa', '', 'Wethersfield', '(860)807-4433', '06109', '100 Great Meadow Road, Suite 200', 'CT', 'US', '', '', '{}', '', '', '', '', '', '', '', '', '');

-- ---------- table: email_opens ----------
DROP TABLE IF EXISTS "email_opens";
CREATE TABLE email_opens (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_id INTEGER NOT NULL,
    email       TEXT NOT NULL,
    opened_at   INTEGER NOT NULL DEFAULT (unixepoch())
  );
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (1, 28, 'zohaibe840@gmail.com', 1781612497);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (2, 28, 'maaz.khurshid.work@gmail.com', 1781612500);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (3, 28, 'zohaibe840@gmail.com', 1781612504);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (4, 28, 'zohaibe840@gmail.com', 1781612517);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (5, 28, 'maaz.khurshid.work@gmail.com', 1781612599);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (6, 30, 'fiveer840@gmail.com', 1781614075);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (7, 30, 'soneill@vhb.com', 1781614078);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (8, 30, 'anthony.moretti@wsp.com', 1781614114);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (9, 30, 'jbmcgovern@transystems.com', 1781614147);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (10, 30, 'fiveer840@gmail.com', 1781614896);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (11, 32, 'zohaibe840@gmail.com', 1781619021);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (12, 32, 'zohaibe840@gmail.com', 1781619030);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (13, 34, 'pmagyar@haleyward.com', 1781706403);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (14, 34, 'fiveer840@gmail.com', 1781706406);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (15, 34, 'jeffrey.long@mottmac.com', 1781706406);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (16, 34, 'marketing@mpengs.com', 1781706413);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (17, 34, 'jtrunfio@theengineeringcorp.com', 1781706415);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (18, 34, 'pmagyar@haleyward.com', 1781706416);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (19, 34, 'kbeek@patrickco.com', 1781706422);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (20, 34, 'andrew.lessard@stantec.com', 1781706424);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (21, 34, 'fiveer840@gmail.com', 1781707189);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (22, 30, 'jbmcgovern@transystems.com', 1781713270);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (23, 36, 'zohaibe840@gmail.com', 1781715501);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (24, 36, 'zohaibe840@gmail.com', 1781715502);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (25, 36, 'zohaibe840@gmail.com', 1781715641);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (26, 36, 'zohaibe840@gmail.com', 1781743745);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (27, 34, 'sajjad.alam@parsons.com', 1781756461);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (28, 34, 'rsaleh@rhsconsultingdesign.com', 1781761214);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (29, 39, 'kmcgaw@consoreng.com', 1781777573);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (30, 39, 'fiveer840@gmail.com', 1781777575);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (31, 39, 'kmcgaw@consoreng.com', 1781777577);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (32, 39, 'sandra.stavola@hdrinc.com', 1781777577);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (33, 39, 'mlow@hoyletanner.com', 1781777578);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (34, 39, 'gjohnson@gpinet.com', 1781777579);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (35, 39, 'james.jackson@hdrinc.com', 1781777581);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (36, 39, 'jmessier@consoreng.com', 1781777582);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (37, 39, 'cassey.weed@mbakerintl.com', 1781777583);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (38, 39, 'info@kseng.com', 1781777585);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (39, 39, 'achakraborty@kseng.com', 1781777597);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (40, 39, 'fiveer840@gmail.com', 1781777618);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (41, 39, 'kfarhoumand@greenintl.com', 1781777634);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (42, 39, 'twilson@hwlochner.com', 1781777635);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (43, 39, 'chylas@hwlochner.com', 1781777635);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (44, 39, 'info@kseng.com', 1781777905);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (45, 0, 'zohaibe840@gmail.com', 1782215211);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (46, 0, 'zohaibe840@gmail.com', 1782215212);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (47, 0, 'in.sultan60@gmail.com', 1782218906);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (48, 0, 'in.sultan60@gmail.com', 1782218906);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (49, 0, 'in.sultan60@gmail.com', 1782336389);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (50, 0, 'zohaibe840@gmail.com', 1782393076);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (51, 0, 'zohaibe840@gmail.com', 1782739884);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (53, 41, 'steven@hartengr.com', 1782743561);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (54, 41, 'jmount@hntb.com', 1782743571);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (55, 41, 'gpalumbojr@jhlynch.com', 1782743574);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (56, 41, 'zkhan@aiengineers.com', 1782743593);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (57, 41, 'arthur.zeman@fando.com', 1782743663);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (58, 41, 'ateliska@jensenhughes.com', 1782743664);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (59, 41, 'aglines@fando.com', 1782743670);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (60, 41, 'kfarhoumand@aiengineers.com', 1782743718);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (61, 41, 'fiveer840@gmail.com', 1782745986);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (62, 41, 'jmount@hntb.com', 1782746903);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (63, 42, 'georges@adicesarepc.com', 1782829955);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (64, 42, 'cvany@cvassociatesny.com', 1782829956);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (65, 42, 'jeffrey.long@mottmac.com', 1782829956);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (66, 42, 'walter.clark@exp.com', 1782829956);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (67, 42, 'scalisej@cdmsmith.com', 1782829959);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (68, 42, 'rroberts@pennoni.com', 1782829960);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (69, 42, 'andrew.lessard@stantec.com', 1782829960);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (70, 42, 'kmcgaw@consoreng.com', 1782829960);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (71, 42, 'marketing@mpengs.com', 1782829960);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (72, 42, 'anthony.moretti@wsp.com', 1782829961);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (73, 42, 'gjohnson@gpinet.com', 1782829961);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (74, 42, 'mlow@hoyletanner.com', 1782829961);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (75, 42, 'kboerner@gfnet.com', 1782829963);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (76, 42, 'jargiro@hntb.com', 1782829964);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (77, 42, 'aislam@aiengineers.com', 1782829967);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (78, 42, 'kbeek@patrickco.com', 1782829976);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (79, 42, 'sandra.stavola@hdrinc.com', 1782829986);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (80, 42, 'rfaulkner@chasolutions.com', 1782829987);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (81, 42, 'jbmcgovern@transystems.com', 1782829997);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (82, 42, 'jtrunfio@theengineeringcorp.com', 1782829999);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (83, 42, 'sdelesdernier@mbakerintl.com', 1782830006);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (84, 42, 'tkendrick@mjinc.com', 1782830006);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (85, 42, 'info@kseng.com', 1782830008);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (86, 42, 'casalep@wseinc.com', 1782830009);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (87, 42, 'david.breza@stvinc.com', 1782830027);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (88, 42, 'sharlacker@hardesty-hanover.com', 1782830039);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (89, 42, 'nkulikauskas@kleinfelder.com', 1782830054);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (90, 42, 'kboerner@gfnet.com', 1782830102);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (91, 42, 'nhabesch@beta-inc.com', 1782830105);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (92, 42, 'kumarb@primeeng.com', 1782830138);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (93, 43, 'benjaminsachwald@gmail.com', 1782830350);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (94, 43, 'jhb@bala.com', 1782830353);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (95, 43, 'mga@bala.com', 1782830354);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (96, 43, 'rbryant@bechtbt.com', 1782830354);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (97, 43, 'atg@bala.com', 1782830354);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (98, 43, 'jlichon@bechtbt.com', 1782830355);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (99, 43, 'cbk@bala.com', 1782830356);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (100, 43, 'kmt@bala.com', 1782830358);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (101, 43, 'alawlor@bechtbt.com', 1782830362);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (102, 43, 'rjv@bala.com', 1782830364);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (103, 43, 'cbryant@bechtbt.com', 1782830367);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (104, 42, 'cvany@cvassociatesny.com', 1782830468);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (105, 43, 'jlichon@bechtbt.com', 1782830792);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (106, 43, 'cbryant@bechtbt.com', 1782830828);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (107, 43, 'luisformoso776@gmail.com', 1782831179);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (108, 43, 'bandtesq@hotmail.com', 1782837041);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (109, 43, 'alawlor@bechtbt.com', 1782854027);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (110, 42, 'jbmcgovern@transystems.com', 1782871343);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (111, 42, 'rsaleh@rhsconsultingdesign.com', 1782884517);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (112, 45, 'dannyro24@gmail.com', 1782916206);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (113, 45, 'lilburntomcat992@gmail.com', 1782916207);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (114, 45, 'psosniak@gmail.com', 1782916212);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (115, 45, 'plangowski@bsalifestructures.com', 1782916212);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (116, 45, 'djacobs@bsalifestructures.com', 1782916213);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (117, 45, 'joshzweback@gmail.com', 1782916213);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (118, 45, 'pguffey@cmtaegrs.com', 1782916213);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (119, 45, 'ascimeca@theclarientgroup.com', 1782916214);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (120, 45, 'cpeltier@ceramiassociates.com', 1782916215);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (121, 45, 'ebarbieri@cosentini.com', 1782916215);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (122, 45, 'rkuzmicki@cosentini.com', 1782916216);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (123, 45, 'dmass@cosentini.com', 1782916216);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (124, 45, 'mseibert@cmtaegrs.com', 1782916216);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (125, 45, 'mmaybaum@cosentini.com', 1782916216);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (126, 45, 'aenache@cosentini.com', 1782916216);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (127, 45, 'tmuench@ceramiassociates.com', 1782916216);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (128, 45, 'gswaluk@cmtaegrs.com', 1782916218);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (129, 45, 'jfox@cosentini.com', 1782916218);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (130, 45, 'tannestephens@gmail.com', 1782916219);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (131, 45, 'cbuscarino@theclarientgroup.com', 1782916219);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (132, 45, 'skokotos@cosentini.com', 1782916220);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (133, 45, 'zbiler@cosentini.com', 1782916220);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (134, 45, 'mscorrano@en-powergroup.com', 1782916221);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (135, 45, 'rrudy@ewingcole.com', 1782916221);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (136, 45, 'ovaidean@cosentini.com', 1782916222);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (137, 45, 'mcanin@canin.com', 1782916224);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (138, 45, 'sceasar@cosentini.com', 1782916224);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (139, 45, 'rleber@cosentini.com', 1782916225);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (140, 45, 'kmussler@cmtaegrs.com', 1782916227);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (141, 45, 'sclaxton@cmtaegrs.com', 1782916230);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (142, 45, 'amaniscalco@ceramiassociates.com', 1782916261);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (143, 45, 'tgmorris@cmtaegrs.com', 1782916268);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (144, 46, 'matthew.sullivan@wsp.com', 1782916299);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (145, 46, 'joshua.roseberg@mbakerintl.com', 1782916299);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (146, 46, 'eric.offenberg@wsp.com', 1782916301);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (147, 46, 'mbowe@vhb.com', 1782916302);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (148, 46, 'rrhodes@vhb.com', 1782916302);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (149, 46, 'christi.fragale@wsp.com', 1782916302);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (150, 46, 'jdufresne@vhb.com', 1782916305);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (151, 46, 'lgalkowski@vhb.com', 1782916306);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (152, 46, 'tperez@vhb.com', 1782916306);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (153, 46, 'cfay@vhb.com', 1782916307);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (154, 46, 'bmahoney@collinsengr.com', 1782916308);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (155, 46, 'jrosen@vhb.com', 1782916309);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (156, 46, 'jklein@vhb.com', 1782916309);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (157, 46, 'rcodega@vhb.com', 1782916327);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (158, 46, 'sryan@vhb.com', 1782916329);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (159, 46, 'tlucivero@vhb.com', 1782916337);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (160, 46, 'shobson@vhb.com', 1782916358);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (161, 45, 'joshzweback@gmail.com', 1782917184);
INSERT INTO "email_opens" ("id", "campaign_id", "email", "opened_at") VALUES (162, 45, 'rleber@cosentini.com', 1782917805);

-- ---------- table: email_templates ----------
DROP TABLE IF EXISTS "email_templates";
CREATE TABLE email_templates (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    subject    TEXT NOT NULL,
    body       TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
  , list_id INTEGER);
INSERT INTO "email_templates" ("id", "name", "subject", "body", "created_at", "updated_at", "list_id") VALUES (26, 'RIDOT 1ST INTRO RESUME LETTER', 'CONFIDENTIAL CANDIDATE WRITE-UP', 'Hi, {{first_name}}

Chief Bridge Inspector / P.E.

We are pleased to present a highly experienced Professional Engineer (P.E.) with 26 years of progressive engineering, construction management, and infrastructure leadership experience. This candidate brings a strong background in bridge inspection, transportation infrastructure, rail, utilities, QA/QC, design management, contract administration, and multidisciplinary project coordination.

The candidate has successfully supported and led complex public infrastructure programs involving major bridge replacement, bridge rehabilitation, transportation corridor improvements, rail infrastructure, civil/site improvements, environmental coordination, and construction-phase engineering support. Their experience includes working closely with public agencies, contractors, consultants, engineers, and stakeholders to keep projects moving from planning and design through construction and completion.

A major strength of this candidate is their ability to manage both the technical engineering side and the field/construction coordination side of infrastructure projects. They have served in leadership roles overseeing quality assurance and quality control, reviewing engineering deliverables, coordinating multiple disciplines, supporting design teams during construction, and ensuring that project work aligns with required standards and project requirements.

This candidate’s background includes direct experience with bridge engineering, bridge rehabilitation and replacement programs, transportation facility improvements, highway/interchange projects, rail engineering programs, emergency infrastructure stabilization, and statewide bridge inspection/asset management programs. Their leadership experience also includes managing civil, structural, electrical, communications, survey, subsurface investigation, environmental, and construction management activities.

Key strengths include:

• Professional Engineer (P.E.) background
• 26 years of progressive infrastructure and engineering experience
• Chief Bridge Inspector / bridge inspection leadership experience
• Strong bridge, transportation, rail, and civil infrastructure background
• QA/QC management and construction inspection oversight
• Design management and design services during construction
• Public agency, contractor, and stakeholder coordination
• Contract administration and project delivery experience
• Multidisciplinary engineering team leadership
• Strong ability to manage complex public-sector infrastructure projects

Overall, this candidate appears to be a strong fit for a Chief Bridge Inspector, Senior Bridge Inspection, Construction Management, Transportation Infrastructure, or P.E.-level project leadership role. Their combination of technical engineering knowledge, field coordination, QA/QC oversight, and executive-level project management experience makes them well suited for complex DOT, bridge, transportation, and infrastructure assignments.

Please review this confidential candidate profile and let us know if you would like to move forward with a conversation. Please advise on next steps.', 1782743336, 1782911479, 11);
INSERT INTO "email_templates" ("id", "name", "subject", "body", "created_at", "updated_at", "list_id") VALUES (28, 'CT Inspector 2nd Email', 'Confidential Candidate for CT Bridge / Infrastructure Review – Please Advise', 'Hi {{first_name}}

Good afternoon,

I am presenting the attached confidential candidate profile for your review and advice regarding any current or upcoming Connecticut transportation, bridge, infrastructure, or CTDOT-related needs.

This candidate is a Professional Engineer / Chief Bridge Inspector with 26 years of progressive engineering, construction management, bridge, transportation, rail, infrastructure, QA/QC, design coordination, and public agency project experience. Their background includes managing complex bridge replacement, rehabilitation, transportation corridor, rail, highway, utility, environmental, and infrastructure programs.

Key areas of strength include:

Bridge Inspection / Bridge Engineering
Construction Management and QA/QC
Transportation and Rail Infrastructure
Design Review and Design Services During Construction
Public Agency Coordination
Contract Administration and Stakeholder Management
Multidisciplinary Engineering Team Leadership
Infrastructure Planning, Risk Management, and Project Delivery

Based on the scope of the candidate’s experience, I would appreciate your feedback on whether this individual may be a fit for any Chief Inspector, Bridge Inspector, Project Manager, Construction Management, Design Coordination, QA/QC, or senior transportation infrastructure role in Connecticut.

Please review and advise on:

Whether this background fits any current CT needs.
Whether the candidate should be considered for upcoming CTDOT bridge or infrastructure work.
Which manager or project group would be the best fit for review.
Whether you would like me to arrange a call or provide additional details.

Thank you, and I look forward to your guidance.

Patrick Novick
Metro Assoc
239-255-5921', 1782829594, 1782911444, 15);
INSERT INTO "email_templates" ("id", "name", "subject", "body", "created_at", "updated_at", "list_id") VALUES (29, 'NYC PE MEP HVAC letter 1', 'NYC MEP / HVAC PE Candidate for Review — Please Advise', 'Hi {{first_name}},

I wanted to present this confidential NYC MEP / HVAC candidate for your review and guidance regarding any current or upcoming Mechanical Engineering, HVAC Design, MEP Coordination, commercial, retail, restaurant, banking, dealership, or NYC building systems needs.

This candidate is a Mechanical Engineer / HVAC Designer with strong experience supporting commercial, retail, restaurant, banking, dealership, and high-end Manhattan project environments. His background includes HVAC design, load calculations, AutoCAD, MEP coordination, site surveys, construction coordination, field reporting, value engineering, punch lists, troubleshooting, and project closeout.

Key areas of strength include:

HVAC Design
MEP Coordination
Load Calculations
AutoCAD Design
Commercial / Retail / Restaurant Projects
NYC Site Surveys and Field Reporting
Construction Coordination
Value Engineering
Punch Lists and Project Closeout
Architect, Contractor, Vendor, and Client Coordination
English / Spanish Bilingual Communication

He has served as a mechanical lead on complex mechanical design projects involving high-end restaurants, retail stores, commercial banks, car dealerships, and other commercial facilities. He has also worked directly with general contractors, architects, mechanical contractors, electrical contractors, plumbing contractors, vendors, and clients to keep projects moving, address field issues, reduce costs, and deliver practical mechanical system solutions.

Based on this background, I would appreciate your advice on whether this candidate may be a fit for any NYC Mechanical Engineer, HVAC Designer, MEP Engineer, PE-level HVAC design support, construction administration, site survey, or commercial building systems role.

Please advise whether this background fits any current or upcoming NYC MEP / HVAC needs, and who would be the best manager or project group to review him.

Thank you, and I look forward to your guidance.

Patrick Novick 
Metro Assoc
239-255-5921', 1782830264, 1782911432, 9);

-- ---------- table: suppression_list ----------
DROP TABLE IF EXISTS "suppression_list";
CREATE TABLE suppression_list (
    email      TEXT PRIMARY KEY,
    reason     TEXT NOT NULL DEFAULT 'unsubscribed',
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  );
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('kdowney@bsals.com', 'bounced', 1782842548);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('asd@bala.com', 'bounced', 1782842548);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('laurie@becht.com', 'bounced', 1782842548);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('bhc@bala.com', 'bounced', 1782842549);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('jkurzner@utexas.edu', 'bounced', 1782842549);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('sbakas@arqmia.com', 'bounced', 1782842549);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('jalfieri@akrf.com', 'bounced', 1782842549);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('gmarcus@akrf.com', 'bounced', 1782842549);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('emoore@akrf.com', 'bounced', 1782842550);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('slemoine@collinsengr.com', 'bounced', 1782842550);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('mabayadullah@aiengineers.com', 'bounced', 1782842550);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('vkonda@aiengineers.com', 'bounced', 1782842550);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('steven@hartengr.com', 'bounced', 1782842550);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('apatel@aiengineers.com', 'bounced', 1782842550);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('amahajan@aiengineers.com', 'bounced', 1782842551);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('aambrosio@aiengineers.com', 'bounced', 1782842551);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('olivia@aiengineers.com', 'bounced', 1782842551);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('rbousa@vhb.com', 'bounced', 1782842551);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('news@patricknovick.com', 'bounced', 1782915923);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('rghisu@ewingcole.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('jgerbner@ewingcole.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('wsmith@cosentini.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('joe.thompson@stantec.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('steve.gendreau@teamdtc.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('lmordetsky@cosentini.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('shay@teamdtc.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('lledonne@cosentini.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('rduke@cosentini.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('mlosquadro@cosentini.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('jeremy@cmtaegrs.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('mhinkel@cmtaegrs.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('pcosta@cosentini.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('trohrbaugh@cmtaegrs.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('jschreier@ceramiassociates.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('david@cbaarchitects.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('mferrara@ceramiassociates.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('ddulgerian@ceramiassociates.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('emanito@ceramiassociates.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('mcastro@canin.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('aleslie@ceramiassociates.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('mezold@ceramiassociates.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('vcerami@ceramiassociates.com', 'bounced', 1782916286);
INSERT INTO "suppression_list" ("email", "reason", "created_at") VALUES ('rfetz@bsals.com', 'bounced', 1782916286);

-- ---------- table: te_connections ----------
DROP TABLE IF EXISTS "te_connections";
CREATE TABLE te_connections (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id       INTEGER NOT NULL UNIQUE,
    access_token  TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    expires_at    INTEGER NOT NULL,
    scope         TEXT NOT NULL,
    created_at    INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at    INTEGER NOT NULL DEFAULT (unixepoch())
  );

COMMIT;
PRAGMA foreign_keys=ON;